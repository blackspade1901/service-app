/**
 * FILE: src/lib/encryption/crypto.ts
 *
 * AES-256-GCM encryption for PII stored in the database.
 * SERVER ONLY — never import in client components.
 *
 * Used for: phone numbers, Aadhaar numbers, PAN numbers.
 * The DB stores ciphertext only. Plaintext never touches the DB.
 *
 * Output format: "ivHex:authTagHex:encryptedHex"
 * All three parts are needed for decryption.
 */
import crypto from 'node:crypto'

const ALGORITHM = 'aes-256-gcm'

// Validate at module load — crash early if env var is missing.
// A missing key means ALL encryption calls silently fail at runtime.
if (!process.env.ENCRYPTION_KEY) {
  throw new Error(
    'ENCRYPTION_KEY environment variable is not set. ' +
    'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))" ' +
    'and add it to .env.local as ENCRYPTION_KEY=<32-byte-hex-string>'
  )
}

// Key must be exactly 32 bytes (64 hex characters) for AES-256.
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

if (KEY.length !== 32) {
  throw new Error(
    `ENCRYPTION_KEY must be a 64-character hex string (32 bytes). ` +
    `Got ${KEY.length} bytes from a ${process.env.ENCRYPTION_KEY.length}-char string.`
  )
}

/**
 * Encrypt plaintext string.
 * @returns "ivHex:authTagHex:ciphertextHex"
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`
}

/**
 * Decrypt a value produced by encrypt().
 * Throws if the data is tampered or the key is wrong.
 */
export function decrypt(data: string): string {
  const parts = data.split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format. Expected "iv:authTag:ciphertext".')
  }
  const [ivHex, authTagHex, encryptedHex] = parts
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  decipher.setAuthTag(authTag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}