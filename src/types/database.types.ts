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
          category: string
          image_url: string | null
          likes: number
          badge_type: string | null
          slug: string
          created_at: string
          views: number
          author_id: string | null
        }
        Insert: {
          id?: string
          category: string
          image_url?: string | null
          likes?: number
          badge_type?: string | null
          slug: string
          created_at?: string
          views?: number
          author_id?: string | null
        }
        Update: {
          id?: string
          category?: string
          image_url?: string | null
          likes?: number
          badge_type?: string | null
          slug?: string
          created_at?: string
          views?: number
          author_id?: string | null
        }
      }
      post_translations: {
        Row: {
          id: string
          post_id: string
          locale: string
          title: string
          description: string
          content: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          post_id: string
          locale: string
          title: string
          description: string
          content: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          post_id?: string
          locale?: string
          title?: string
          description?: string
          content?: string
          metadata?: Json | null
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
