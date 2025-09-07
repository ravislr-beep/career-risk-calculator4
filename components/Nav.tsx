// components/Nav.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Explicitly typing the response from getSession()
    supabase.auth.getSession().then((res: { data: { session: Session | null } }) => {
      const session = res.data?.session;
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      {user ? (
        <span>Welcome, {user.email}</span>
      ) : (
        <span>Not logged in</span>
      )}
    </nav>
  );
}
