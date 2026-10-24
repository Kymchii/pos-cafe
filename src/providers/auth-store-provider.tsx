"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { Profile } from "@/types/auth";
import { ReactNode, useEffect } from "react";

type AuthStoreProviderProps = {
  children: ReactNode;
  profile: Profile;
};

export default function AuthStoreProvider({
  children,
  profile,
}: AuthStoreProviderProps) {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setProfile(profile);
    });
  });
  return <>{children}</>;
}
