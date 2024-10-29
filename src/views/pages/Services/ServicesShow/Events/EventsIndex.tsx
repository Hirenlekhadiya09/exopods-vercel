import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventItem from "./_components/EventItem";
import Loader from "../../../_components/Loader";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function EventsIndex() {
  const { id } = useParams();
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getASinglePod(id);
  }, []);

  async function getASinglePod(id: string | undefined) {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}kube/list-container/${id}`;

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
      .then((cData) => {
        setIsLoading(false);
        setEventsData(cData.data[0].events);
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
      {eventsData.map((event: string) => (
        <EventItem text={event} />
      ))}
    </div>
  );
}

export default EventsIndex;
