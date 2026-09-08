export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      organization_members: {
        Row: {
          created_at: string;
          organization_id: string;
          role: Database["public"]["Enums"]["organization_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          organization_id: string;
          role?: Database["public"]["Enums"]["organization_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          organization_id?: string;
          role?: Database["public"]["Enums"]["organization_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          address_line_1: string;
          address_line_2: string | null;
          city: string;
          created_at: string;
          created_by: string;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string;
          onboarding_completed_at: string | null;
          phone: string;
          postal_code: string;
          slug: string;
          state: string;
          updated_at: string;
        };
        Insert: {
          address_line_1: string;
          address_line_2?: string | null;
          city?: string;
          created_at?: string;
          created_by: string;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          onboarding_completed_at?: string | null;
          phone: string;
          postal_code: string;
          slug: string;
          state?: string;
          updated_at?: string;
        };
        Update: {
          address_line_1?: string;
          address_line_2?: string | null;
          city?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          onboarding_completed_at?: string | null;
          phone?: string;
          postal_code?: string;
          slug?: string;
          state?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      create_restaurant_organization: {
        Args: {
          p_address_line_1: string;
          p_address_line_2: string | null;
          p_city: string;
          p_name: string;
          p_phone: string;
          p_postal_code: string;
          p_state: string;
        };
        Returns: string;
      };
      has_organization_role: {
        Args: {
          allowed_roles: Database["public"]["Enums"]["organization_role"][];
          target_organization_id: string;
        };
        Returns: boolean;
      };
      is_organization_member: {
        Args: { target_organization_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      organization_role: "owner" | "admin" | "staff";
    };
    CompositeTypes: Record<never, never>;
  };
};

export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
export type OrganizationRole = Database["public"]["Enums"]["organization_role"];
