export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          category: string
          image_url: string | null
          likes: number
          badge_type: string | null
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          category: string
          image_url?: string | null
          likes?: number
          badge_type?: string | null
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          category?: string
          image_url?: string | null
          likes?: number
          badge_type?: string | null
          slug?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
