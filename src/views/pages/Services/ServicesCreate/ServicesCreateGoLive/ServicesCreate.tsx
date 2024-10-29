import { useLocation, useNavigate } from "react-router-dom";
import {
  Dots,
  CurrentProcess,
  DeployProgress,
  GitRepoCard,
  CompletedProcess,
} from "pages/Services/_sections/DeployProgress";
import { useEffect, useState } from "react";
import useUserCredits from "pages/contexts/useUserCredits";
import dataLayerTrialEvent from "pages/Services/utils/dataLayerTrialEvent";

const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function Loader() {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <h2 className="animate-spin">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
        </svg>
      </h2>
    </div>
  );
}

function CompletedPipelineProcess({ name }: { name: string }) {
  return (
    <div className="bg-[#0D1014] border border-[#63C17480] rounded-md flex justify-between items-center px-[26px] py-[22px]">
      <span className="inline-block text-[#63C174] text-[14px]">{name}</span>
      <div className="border-[1.5px] border-[#63C174] w-6 h-6 rounded-full flex justify-center items-center">
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.08372L2.65757 7.4521C3.17709 8.1944 4.24346 8.17998 4.74438 7.42386L9 1"
            stroke="#63C174"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

interface CurrentPipelineProcessProps {
  name: string;
  status?: string;
  logsData?: string;
  showLogs?: boolean;
  setShowLogs?: (value: boolean) => void;
}

function CurrentPipelineProcess({
  name,
  status,
  logsData,
  showLogs,
  setShowLogs,
}: CurrentPipelineProcessProps) {
  const logsArray = logsData?.split("\n");

  return (
    <section>
      <div
        className={`bg-[#0D1014] border border-[#BBBBBB1F] ${
          showLogs ? "rounded-t-md" : "rounded-md"
        } flex justify-between items-center px-[26px] ${
          logsData ? "py-[17px]" : "py-[22px]"
        }`}
      >
        <span className="inline-block text-[#C4C4C4A8] text-[14px]">
          {name}
        </span>
        <div className="flex items-center gap-7">
          {status && status == "building" && setShowLogs && (
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="flex items-center gap-2 border border-[#BBBBB126] rounded-[4px] px-4 py-2"
            >
              <div className="bg-[#63C174] w-2 h-2 rounded-full"></div>
              <span className="text-[#fff] text-xs inline-block mr-7">
                View logs
              </span>
              {showLogs ? (
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.871338 1.41312L5.78331 6.49962L10.8698 1.58764"
                    stroke="white"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.24011 10.9556L6.32661 6.04364L1.41464 0.957135"
                    stroke="white"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </button>
          )}
          <div className="animate-[spin_2s_linear_infinite]">
            <div className="border border-dashed border-[#fff] w-6 h-6 rounded-full flex justify-center items-center"></div>
          </div>
        </div>
      </div>
      {showLogs && (
        <div
          className={`bg-[#0D1014] h-[300px] logs-scrollbar overflow-y-scroll border border-[#BBBBBB1F] rounded-b-md border-t-0 px-[26px] py-[22px]`}
        >
          <div className="build-logs">
            {logsArray?.map((logs: string) => (
              <p className="mb-1 text-[#f8f8f8] text-[13px]">{logs}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function YetToCompletePipelineProcess({ name }: { name: string }) {
  return (
    <div className="bg-[#0D1014] border border-[#BBBBBB1F] rounded-md flex justify-between items-center px-[26px] py-[22px]">
      <span className="inline-block text-[#C4C4C4A8] text-[14px]">{name}</span>
      <div className="border border-[#333333] w-6 h-6 rounded-full flex justify-center items-center"></div>
    </div>
  );
}

function FailedPipelineProcess({
  name,
  isLoading,
  logsData,
}: {
  name: string;
  isLoading: boolean;
  logsData: string;
}) {
  const logsArray = logsData.split("\n");

  return (
    <div className="bg-[#0D1014] border border-[#dc2626] rounded-md px-[26px] py-[22px]">
      <span className="inline-block text-[#991b1b] text-[16px]">{name}</span>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-4 h-[50vh] build-logs logs-scrollbar overflow-y-scroll">
          {logsArray.map((logs: string) => (
            <p className="mb-1 text-[#f8f8f8] text-[14px]">{logs}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesCreate() {
  const {
    state: {
      selectedRepo,
      selectedBranch,
      deploymentName,
      ownerName,
      port,
      command,
      args,
      envs,
      presetId,
    },
  } = useLocation();
  const navigate = useNavigate();
  const [buildStatus, setBuildStatus] = useState<string>("");
  const [disableServicesButton, setDisableServicesButton] = useState(true);
  const [deploymentStatus, setDeploymentStatus] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageTag, setImageTag] = useState("");
  const [logsData, setLogsData] = useState("");
  // const [showLogs, setShowLogs] = useState(false);
  // const [startBuildLogsInterval, setStartBuildLogsInterval] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cCWarning, setCCWarning] = useState("");
  const { txnArray } = useUserCredits();
  const accessToken = window.localStorage.getItem("access_token");
  let buildStatusInterval: NodeJS.Timeout | undefined;
  // let buildLogsInterval: NodeJS.Timeout | undefined;

  useEffect(() => {
    CreateDeployment();
  }, []);

  useEffect(() => {
    if (buildStatus === "ready") {
      setDeploymentStatus("starting");
      CreateContainer();
    }
    // if (buildStatus !== "building") {
    //   clearInterval(buildLogsInterval);
    // }
  }, [buildStatus]);

  async function CreateContainer() {
    const apiUrl = `${exoApiUrl}kube/create-container`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        preset: presetId,
        container_name: deploymentName,
        image: imageName,
        image_tag: imageTag,
        port: parseInt(port),
        env: envs,
        args: args,
        command: command,
      }),
    })
      .then((res) => {
        if (res.ok || res.status == 400) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((cData) => {
        if (cData.message === "Container already exists") {
          setCCWarning("container already exists");
        } else if (
          cData.message ===
          "Enough credits not available, minimum 5 mins of credits are required to launch this pod"
        ) {
          setCCWarning(
            "Enough credits not available, minimum 5 mins of credits are required to launch this pod"
          );
        } else {
          dataLayerTrialEvent(txnArray);
          setDisableServicesButton(false);
          setDeploymentStatus("deployed");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async function CreateDeployment() {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}pipeline/deploy`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        data: {
          username: ownerName,
          installation_token: window.localStorage.getItem("installation_token"),
          repo_name: selectedRepo,
          branch_name: selectedBranch,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        setImageName(res.data.repo);
        setImageTag(res.data.tag);
        const buildId = res.data.build_id;
        buildStatusInterval = setInterval(async () => {
          fetchBuildStatus(buildId);
        }, 3000);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async function fetchBuildStatus(buildId: any) {
    const apiUrl = `${exoApiUrl}pipeline/status/${buildId}`;

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
        return Promise.reject(res);
      })
      .then((res) => {
        setBuildStatus(res.data[0].build_status);

        if (res.data[0].build_status === "ready") {
          clearInterval(buildStatusInterval);
        }
        // else if (
        //   res.data[0].build_status === "building" &&
        //   startBuildLogsInterval
        // ) {
        //   handleBuildLogs(buildId);
        //   buildLogsInterval = setInterval(async () => {
        //     handleBuildLogs(buildId);
        //   }, 10000);
        //   setStartBuildLogsInterval(false);
        // }
        else if (res.data[0].build_status === "failed") {
          handleBuildLogs(buildId);
          clearInterval(buildStatusInterval);
          // clearInterval(buildLogsInterval);
        }
      })
      .catch((err: any) => {
        clearInterval(buildStatusInterval);
        // clearInterval(buildLogsInterval);
        console.log(err);
      });
  }

  async function handleBuildLogs(id: string | undefined) {
    const apiUrl = `${exoApiUrl}pipeline/logs/${id}`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        repo_name: selectedRepo,
        branch_name: selectedBranch,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .then((res) => {
        setLogsData(res.data);
        setIsLoading(false);
        setDisableServicesButton(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <>
      <div className="flex">
        <div className="m-12">
          <GitRepoCard
            selectedRepo={selectedRepo}
            selectedBranch={selectedBranch}
          />
          <DeployProgress>
            <CompletedProcess
              heading="Configure Github"
              description="Specify how Exopods will build your site. "
              inProcess={false}
              step={1}
            />
            <Dots />
            <CompletedProcess
              heading="Configure Deployment"
              description="Specify how Exopods will build your site. "
              inProcess={false}
              step={2}
            />
            <Dots />
            <CurrentProcess
              heading="Go Live"
              description="Specify how Exopods will build your site. "
              inProcess={false}
              step={3}
            />
          </DeployProgress>
        </div>
        <div className="m-12 p-8 w-full border border-[#BBBBBB26] rounded-[9px]">
          <div className="mb-6">
            <h3 className="text-[#EDEDED] text-[22px] font-medium">Building</h3>
            <p className="text-[#c4c4c4] text-[14px]">
              Note: Please do not exit or refresh the page, Progress may be
              lost.
            </p>
          </div>
          <section>
            <div>
              <div className="flex flex-col gap-3">
                {buildStatus === "" && (
                  <>
                    <YetToCompletePipelineProcess name="Build Started" />
                    <YetToCompletePipelineProcess name="Pulling Code" />
                    <YetToCompletePipelineProcess name="Building Image" />
                    <YetToCompletePipelineProcess name="Build Completed" />
                    <YetToCompletePipelineProcess name="Pushing Image" />
                    <YetToCompletePipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "started" && (
                  <>
                    <CurrentPipelineProcess name="Build Started" />
                    <YetToCompletePipelineProcess name="Pulling Code" />
                    <YetToCompletePipelineProcess name="Building Image" />
                    <YetToCompletePipelineProcess name="Build Completed" />
                    <YetToCompletePipelineProcess name="Pushing Image" />
                    <YetToCompletePipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "cloning" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CurrentPipelineProcess name="Pulling Code" />
                    <YetToCompletePipelineProcess name="Building Image" />
                    <YetToCompletePipelineProcess name="Build Completed" />
                    <YetToCompletePipelineProcess name="Pushing Image" />
                    <YetToCompletePipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "building" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CompletedPipelineProcess name="Pulling Code" />
                    <CurrentPipelineProcess
                      name="Building Image"
                      // status="building"
                      // logsData={logsData}
                      // showLogs={showLogs}
                      // setShowLogs={setShowLogs}
                    />
                    <YetToCompletePipelineProcess name="Build Completed" />
                    <YetToCompletePipelineProcess name="Pushing Image" />
                    <YetToCompletePipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "build_completed" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CompletedPipelineProcess name="Pulling Code" />
                    <CompletedPipelineProcess name="Building Image" />
                    <CurrentPipelineProcess name="Build Completed" />
                    <YetToCompletePipelineProcess name="Pushing Image" />
                    <YetToCompletePipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "pushing" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CompletedPipelineProcess name="Pulling Code" />
                    <CompletedPipelineProcess name="Building Image" />
                    <CompletedPipelineProcess name="Build Completed" />
                    <CurrentPipelineProcess name="Pushing Image" />
                    <YetToCompletePipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "ready" && deploymentStatus === "" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CompletedPipelineProcess name="Pulling Code" />
                    <CompletedPipelineProcess name="Building Image" />
                    <CompletedPipelineProcess name="Build Completed" />
                    <CompletedPipelineProcess name="Pushing Image" />
                    <CompletedPipelineProcess name="Pushed" />
                    <YetToCompletePipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {deploymentStatus === "starting" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CompletedPipelineProcess name="Pulling Code" />
                    <CompletedPipelineProcess name="Building Image" />
                    <CompletedPipelineProcess name="Build Completed" />
                    <CompletedPipelineProcess name="Pushing Image" />
                    <CompletedPipelineProcess name="Pushed" />
                    <CurrentPipelineProcess name="Deploying Service" />
                    <YetToCompletePipelineProcess name="Deployment Completed" />
                  </>
                )}
                {deploymentStatus === "deployed" && (
                  <>
                    <CompletedPipelineProcess name="Build Started" />
                    <CompletedPipelineProcess name="Pulling Code" />
                    <CompletedPipelineProcess name="Building Image" />
                    <CompletedPipelineProcess name="Build Completed" />
                    <CompletedPipelineProcess name="Pushing Image" />
                    <CompletedPipelineProcess name="Pushed" />
                    <CompletedPipelineProcess name="Deploying Service" />
                    <CompletedPipelineProcess name="Deployment Completed" />
                  </>
                )}
                {buildStatus === "failed" && deploymentStatus === "" && (
                  <>
                    <FailedPipelineProcess
                      name="Build Failed"
                      isLoading={isLoading}
                      logsData={logsData}
                    />
                  </>
                )}
              </div>
              {cCWarning !== "" && (
                <div className="mt-4">
                  <span className="text-red-500 text-sm mt-3 inline-block">
                    {cCWarning}
                  </span>
                </div>
              )}

              <div className="mt-12">
                <button
                  className={`${
                    disableServicesButton
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } mb-8 text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] hover:!bg-[#fff] ease-in-out hover:text-[#000] text-sm font-medium`}
                  style={{
                    background: `linear-gradient(90deg, rgba(26, 115, 232, 0.05) 0%, rgba(240, 40, 73, 0.05) 54%, rgba(133, 59, 206, 0.05) 98.5%)`,
                  }}
                  disabled={disableServicesButton}
                  onClick={() => navigate("/services")}
                >
                  Go to Services
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
