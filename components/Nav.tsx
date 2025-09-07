import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

export default function Nav() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then((res: { data: { session: Session | null } }) => {
      const session = res.data?.session;
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <nav>
      {user ? <span>Welcome, {user.email}</span> : <span>Not logged in</span>}
    </nav>
  );
}
