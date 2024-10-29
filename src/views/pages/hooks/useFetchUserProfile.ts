import useUserCredits from "pages/contexts/useUserCredits";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function useFetchUserProfile() {
  const { updateCredits, setIsCreditsLoading, setTxnArray } = useUserCredits();
  const accessToken = window.localStorage.getItem("access_token");

  const fetchUserProfile = () => {
    setIsCreditsLoading(true);

    fetch(`${exoApiUrl}user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        const credits = Number(parseFloat(res.data.credits).toFixed(5));
        updateCredits(credits);
        setTxnArray(res.data.txn_id);
        setIsCreditsLoading(false);
      })
      .catch((err) => {
        setIsCreditsLoading(false);
        console.log(err);
      });
  };

  return { fetchUserProfile };
}

export default useFetchUserProfile;
