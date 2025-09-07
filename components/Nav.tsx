// components/Nav.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      const session = (res as any)?.data?.session;
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <nav>
      <h1>Welcome {user?.email ?? 'Guest'}</h1>
      {user ? <button onClick={() => supabase.auth.signOut()}>Logout</button> : null}
    </nav>
  );
}
