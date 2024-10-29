export async function fetchPresetsData(): Promise<any> {
  const accessToken = window.localStorage.getItem("access_token");
  const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

  const response = await fetch(`${exoApiUrl}presets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const res = await response.json();
  return res.data;
}
