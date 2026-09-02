// Placeholder até existir schema real no Supabase.
// Quando houver tabelas, gere os tipos reais com:
//   supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
export type Database = {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
