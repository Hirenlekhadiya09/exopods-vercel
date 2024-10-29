import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogItem from "./_components/LogItem";
// import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../../../_components/Loader";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function LogsIndex() {
  const { id } = useParams();
  const [logsData, setLogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    handleContainerLogs(id);
  }, []);

  // const accessToken = localStorage.getItem("access_token");

  async function handleContainerLogs(id: string | undefined) {
    // const accessToken = await getAccessTokenSilently();
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}kube/logs/${id}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
        return Promise.reject(res);
      })
      .then((lData) => {
        setLogsData(lData.data);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {logsData.map((logs: string) => (
        <LogItem text={logs} />
      ))}
    </div>
  );
}

export default LogsIndex;
