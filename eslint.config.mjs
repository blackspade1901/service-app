import { defineConfig, globalIgnores } from 'eslint/config'

/** Minimal flat config so `next build` can run; extend with project rules as needed. */
const eslintConfig = defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
])

export default eslintConfig
