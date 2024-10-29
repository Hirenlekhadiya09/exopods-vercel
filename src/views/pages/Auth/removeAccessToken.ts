const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;

export function removeAccessToken() {
  let supabaseAuthTokenKey: string | undefined;
  window.localStorage.removeItem("access_token");

  const sbSubdomainMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
  if (sbSubdomainMatch) {
    const sbSubdomain = sbSubdomainMatch[1];
    supabaseAuthTokenKey = `sb-${sbSubdomain}-auth-token`;
  }

  const items = { ...localStorage };
  for (const item in items) {
    if (supabaseAuthTokenKey && item.includes(supabaseAuthTokenKey)) {
      localStorage.removeItem(item);
    }
  }
}
