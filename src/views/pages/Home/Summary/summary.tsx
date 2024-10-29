import Header from "pages/_components/Header/Header";
import Navigation from "pages/_components/Navigation/Navigation";
import { useEffect, useState } from "react";
import SummaryDockerConfiguration from "./components/SummaryDockerConfiguration";
import SummaryDockerDetails from "./components/SummaryDockerDetails";
import SummaryDangerZone from "./components/SummaryDangerZone";
import SummaryDockerDeployment from "./components/SummaryDockerDeployment";
import { useNavigate, useParams } from "react-router-dom";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
// import { configPages } from "config/configPages";
import ArrowLeft from "assets/icons/arrow-left.svg";
import LogsIndex from "pages/Services/ServicesShow/Logs/LogsIndex";
import EventsIndex from "pages/Services/ServicesShow/Events/EventsIndex";
import Loader from "pages/_components/Loader";
import { resetAllFields } from "../../../../store/editSlice";
import { useDispatch } from "react-redux";
import editIcon from "/src/assets/icons/editIconOutline.svg"

interface DockerDetails {
  image_tag?: string;
  port?: string;
  command?: string;
  args?: string;
  env?: { name: string; value: string }[];
  selectedSecret: string;
}

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [summaryData, setSummaryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [machineTierData, setMachineTierData] = useState<any>(null);
  const [isSummaryDataLoaded, setIsSummaryDataLoaded] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>();
  const [activeRevision, setActiveRevision] = useState<any>(null);
  const [dockerTabs, setDockerTabs] = useState<string>();
  const [dockerDetails, setDockerDetails] = useState<any>({
    image_tag: "",
    port: "",
    command: "",
    args: "",
    env: [],
    selectedSecret: "",
  });
  const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;
  const { id } = useParams();
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  const handleTabChanges = (tab: any) => {
    setDockerTabs(tab);
  };

  async function handleGetSummary() {
    setIsLoading(true);
    const accessToken = window.localStorage.getItem("access_token");
    const getSummaryDetails = `${exoApiUrl}kube/list-container/${id}`;

    try {
      const response = await fetch(getSummaryDetails, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        setSummaryData(data?.data[0]);
        setIsSummaryDataLoaded(true);
      } else if (response.status === 401) {
        removeAccessToken();
        navigate("/");
      }
    } catch (err) {
      setIsLoading(true);
      console.log("Error:", err);
    }
  }

  async function fetchMachineTierData() {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}presets`;

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const matchingPreset = data?.data?.find(
          (preset: any) => preset?._id === summaryData?.container?.preset
        );
        setMachineTierData(matchingPreset);
      } else if (res.status === 401) {
        removeAccessToken();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handleGetSummary();
  }, [id]);

  useEffect(() => {
    if (isSummaryDataLoaded) {
      fetchMachineTierData();
    }
  }, [isSummaryDataLoaded]);

  useEffect(() => {
    if (summaryData?.container) {
      const container = summaryData.container;
      const { rev_active, revisions } = container;
      const activeRevision = revisions?.find(
        (revision: any) => revision._id === rev_active
      );
      setActiveRevision(activeRevision);
    }
  }, [summaryData]);

  useEffect(() => {
    if (activeRevision) {
      setDockerDetails({
        image_tag: activeRevision.image_tag || "",
        port: activeRevision.port || "",
        command: activeRevision.command || "",
        args: activeRevision.args || "",
        env: activeRevision.env || [],
        selectedSecret: activeRevision.selectedSecret || "",
      });
    }
  }, [activeRevision]);

  useEffect(() => {
    setActiveTab("details");
    setDockerTabs("docker-configurations");
  }, []);

  async function handleUpdateSummaryDetails() {
    setIsLoading(true);
    const accessToken = window.localStorage.getItem("access_token");
    const updateUrl = `${exoApiUrl}kube/rollout-update/${id}`;

    if (!summaryData || !activeRevision) {
      console.error("Summary data or active revision not available.");
      return;
    }

    const updatedValues = {
      image_tag: dockerDetails?.image_tag,
      port: Number(dockerDetails.port),
      env: dockerDetails.env,
      args: dockerDetails.args,
      command: dockerDetails.command,
    };
    try {
      const response = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        setIsLoading(false);
        await response.json();
        handleGetSummary();
        dispatch(resetAllFields());
      } else if (response.status === 401) {
        removeAccessToken();
        navigate("/");
      } else {
        console.error("Update failed with status:", response.status);
      }
    } catch (err) {
      setIsLoading(true);
      console.error("Error:", err);
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="relative min-h-screen bg-[#0C1015]  ">
        <div id="context-wrap" className={`flex flex-col h-full`}>
          <div className="hidden exobp:flex">
            <Navigation />
          </div>

          <div className={`flex exobp:pl-[80px] flex-col h-full relative`}>
            <Header />
            <main className="h-full w-full">
              <div className="py-[16px] px-[32px] border border-[#BBBBBB26]">
                <div className="flex justify-between">
                  <div className="flex gap-[9px]">
                    <button
                      onClick={() => navigate(-1)}
                      className="text-white py-2 "
                    >
                      {" "}
                      <img src={ArrowLeft} alt="" />
                    </button>
                    <button
                      className={`py-2 px-3 text-sm font-normal rounded-md ${
                        activeTab === "details"
                          ? "bg-[#BBBBBB17] text-[#fff]"
                          : "text-[#C4C4C4A8]"
                      }`}
                      onClick={() => handleTabChange("details")}
                    >
                      Details
                    </button>
                    <button
                      className={`py-2 px-3 text-sm font-normal rounded-md ${
                        activeTab === "logs"
                          ? "bg-[#BBBBBB17] text-[#fff]"
                          : "text-[#C4C4C4A8]"
                      }`}
                      onClick={() => handleTabChange("logs")}
                    >
                      Logs
                    </button>
                    <button
                      className={`py-2 px-3 text-sm font-normal rounded-md ${
                        activeTab === "revisions"
                          ? "bg-[#BBBBBB17] text-[#fff]"
                          : "text-[#C4C4C4A8]"
                      }`}
                      onClick={() => handleTabChange("revisions")}
                    >
                      Events
                    </button>
                  </div>
                  <div>
                    <button
                      className="text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] px-3 ease-in-out hover:text-[#000] text-sm font-medium bg-[linear-gradient(90deg,rgba(26,115,232,0.05)0%,rgba(240,40,73,0.05)54%,rgba(133,59,206,0.05)98.5%)]"
                      //  onClick={handleEditSummary}
                    >
                      <div className="flex gap-[6px] items-center">
                        <img
                          src={editIcon}
                          alt=""
                        />
                        <span
                          onClick={handleUpdateSummaryDetails}
                          className="text-[#FFF] text-sm font-normal"
                        >
                          Save & Deploy New Revision{" "}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-[29px_48px_29px_31px]">
                <SummaryDockerDeployment
                  machineTierData={machineTierData}
                  activeRevision={activeRevision}
                  summaryData={summaryData}
                />

                {activeTab === "details" && (
                  <>
                    <div className="mt-[19px] flex gap-[67px]">
                      <div className="max-w-[284px] w-full border border-[#BBBBBB26] p-2 rounded-[8px] flex flex-col gap-2 h-max">
                        <button
                          className={`${
                            dockerTabs === "docker-configurations"
                              ? "bg-[#BBBBBB0A]"
                              : ""
                          } text-[16px] font-medium text-[#FFFFFF] py-[9px] px-4 rounded-md text-left`}
                          onClick={() =>
                            handleTabChanges("docker-configurations")
                          }
                        >
                          Docker Configurations
                        </button>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Deployment Name
                          </span>
                        </div>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Repo URL/Tag
                          </span>
                        </div>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Private Registry
                          </span>
                        </div>
                        <div className="border-t border-t-[#BBBBBB26]"></div>
                        <button
                          className={`${
                            dockerTabs === "docker-details"
                              ? "bg-[#BBBBBB0A]"
                              : ""
                          } text-[16px] font-medium text-[#FFFFFF] py-[9px] px-4 rounded-md text-left`}
                          onClick={() => handleTabChanges("docker-details")}
                        >
                          Deployment Details
                        </button>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Port
                          </span>
                        </div>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Command
                          </span>
                        </div>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Arguments
                          </span>
                        </div>
                        <div className="px-[32px] py-[4px] ">
                          <span className="text-sm font-normal text-[#ABB5BF]">
                            Environment Variable
                          </span>
                        </div>
                        <div className="border-t border-t-[#BBBBBB26]"></div>
                        <button
                          className={`${
                            dockerTabs === "dangerzone" ? "bg-[#BBBBBB0A]" : ""
                          } text-[16px] font-medium text-[#D93036] py-[9px] px-4 rounded-md text-left`}
                          onClick={() => handleTabChanges("dangerzone")}
                        >
                          Danger Zone
                        </button>
                      </div>
                      <div className="w-full">
                        {dockerTabs === "docker-configurations" && (
                          <>
                            <SummaryDockerConfiguration
                              summaryData={summaryData?.container}
                              activeRevision={activeRevision}
                              onUpdate={(updatedValues) => {
                                setDockerDetails((prev: DockerDetails) => ({
                                  ...prev,
                                  image_tag:
                                    updatedValues.image_tag || prev.image_tag,
                                  selectedSecret:
                                    updatedValues.selectedSecret ||
                                    prev.selectedSecret,
                                }));
                              }}
                            />
                          </>
                        )}
                        {dockerTabs === "docker-details" && (
                          <>
                            <SummaryDockerDetails
                              activeRevision={activeRevision}
                              onUpdate={(updatedValues) => {
                                setDockerDetails((prev: DockerDetails) => ({
                                  ...prev,
                                  ...updatedValues,
                                }));
                              }}
                            />
                          </>
                        )}
                        {dockerTabs === "dangerzone" && (
                          <>
                            <SummaryDangerZone />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "logs" && (
                  <>
                    <LogsIndex />
                  </>
                )}
                {activeTab === "revisions" && (
                  <>
                    <EventsIndex />
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
