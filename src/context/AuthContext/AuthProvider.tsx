import { Session, User } from "@supabase/supabase-js";
import { useState, useEffect, createContext } from "react";
import { supabaseClient } from "config/supabaseClient";

export const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  logOut: () => void;
}>({ session: null, user: null, logOut: () => {} });

export const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "SIGNED_IN":
            setSession(session);
            setUser(session?.user);
            break;
          case "SIGNED_OUT":
            setSession(null);
            // @ts-ignore
            setUser(null);
            break;
          default:
        }
      }
    );

    setData();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    logOut: () => supabaseClient.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
