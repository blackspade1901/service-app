// Database types generated from Supabase schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'customer' | 'provider' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'customer' | 'provider' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'customer' | 'provider' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      providers: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string // encrypted
          aadhaar: string // encrypted
          location: string
          services: string[]
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone: string
          aadhaar: string
          location: string
          services: string[]
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone?: string
          aadhaar?: string
          location?: string
          services?: string[]
          rating?: number
          created_at?: string
        }
      }
      // Add more tables as needed
    }
    Views: {
      provider_search_view: {
        Row: {
          id: string
          name: string
          location: string
          services: string[]
          rating: number
        }
      }
    }
    Functions: {
      // Add functions if any
    }
  }
}