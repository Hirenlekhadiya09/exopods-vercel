import { Link, useNavigate } from "react-router-dom";
import {
  Dots,
  CurrentProcess,
  CompletedProcess,
} from "pages/Services/_sections/DeployProgress";
import { useEffect, useState } from "react";
import { fetchPresetsData } from "pages/Services/_components/presetsData";
import { manageData } from "pages/contexts/dockerContext";
import useUserCredits from "pages/contexts/useUserCredits";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
import { configPages } from "config/configPages";
import ArrowLeft from "assets/icons/arrow-left.svg";
import dataLayerTrialEvent from "pages/Services/utils/dataLayerTrialEvent";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

interface PriceBoxProps {
  name: string;
  costPerHour: number;
  info: string[];
  className: string;
}

function PriceType({ name, className }: { name: string; className: string }) {
  return (
    <div
      className={`${className} border max-w-max px-[8px] py-[3px] rounded-[6px]`}
    >
      {name}
    </div>
  );
}

function PriceBox({ name, costPerHour, info, className }: PriceBoxProps) {
  return (
    <div className={`${className} border-[1px] rounded-[6px] p-5 w-full`}>
      {name == "Micro" && (
        <PriceType
          name={name}
          className="text-[#FC9C66] bg-[#3C1403] border-[#962D00]"
        />
      )}
      {name == "Small" && (
        <PriceType
          name={name}
          className="text-[#853BCE] bg-[#853BCE26] border-[#853BCE]"
        />
      )}
      {name == "Large" && (
        <PriceType
          name={name}
          className="text-[#1A73E8] bg-[#1A73E826] border-[#1A73E8]"
        />
      )}

      <div className="text-[#A1A1A1] text-[14px] mt-4">
        <span className="block">{info[0]}</span>
        <span>{info[1]}</span>
      </div>
      <div className="text-[14px] mt-3">
        <span className="text-[#27B648] font-semibold">${costPerHour}</span>{" "}
        <span className="text-[#FAFAFA]">/ hour</span>
      </div>
    </div>
  );
}

export default function ServicesCreateDocker() {
  const [envs, setEnvs]: any = useState([{ name: "", value: "" }]);
  const [presetsData, setPresetsData] = useState([]);
  const [presetId, setPresetId] = useState("");
  const [cCWarning, setCCWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("🚀 ~ ServicesCreateDocker ~ isLoading:", isLoading);
  const [port, setPort] = useState("");
  const [envsContent, setEnvsContent] = useState("");
  const [args, setArgs] = useState("");
  const [command, setCommand] = useState("");
  const [presetPricePerMinute, setPresetPicePerMinute] = useState("");
  const { data, setData } = manageData();

  console.log("🚀 ~ ServicesCreateDocker ~ data:", data);
  const { credits, txnArray } = useUserCredits();

  const navigate = useNavigate();

  useEffect(() => {
    getPresetsData();
  }, []);

  async function getPresetsData() {
    try {
      const data = await fetchPresetsData();
      setPresetsData(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handlePricing(id: string) {
    const selectedPreset: any = presetsData.filter(
      (item: any) => item._id === id
    );
    setPresetId(selectedPreset[0]._id);
    setPresetPicePerMinute(selectedPreset[0].costPerMinute);
  }

  const formatEnvs = (
    input: string
  ): Array<{ name: string; value: string }> => {
    return input
      .split("\n")
      .filter((line) => line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        const name = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();
        return { name, value };
      });
  };

  function handleCreateContainerCheck() {
    const requiredInitialCredits: number = Number(presetPricePerMinute) * 5;
    if (credits < requiredInitialCredits) {
      setCCWarning(
        "Enough credits not available, minimum 5 mins of credits are required to launch this pod"
      );
      return;
    }
    if (
      data?.containerName !== "" &&
      data?.dockerRepoURL !== "" &&
      data?.imgTag !== "" &&
      port !== "" &&
      presetId !== ""
      // && isAuthenticated
    ) {
      handleCreateContainer();
    } else {
      setCCWarning("Fill all required fields including Pricing Configuration.");
    }
  }

  const handleCreateContainer = () => {
    const accessToken = window.localStorage.getItem("access_token");
    setIsLoading(true);
    const apiUrl = `${exoApiUrl}kube/create-container`;

    if (envs[0].name.length < 1) {
      envs.splice(0, 1);
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        preset: presetId,
        container_name: data?.containerName,
        image: data?.dockerRepoURL,
        image_tag: data?.imgTag,
        port: parseInt(port),
        env: formatEnvs(envsContent),
        args: args,
        command: command,
        secret_name: data?.selectedItem?.secret_name || "",
      }),
    })
      .then((res) => {
        if (res.ok || res.status == 400) {
          return res.json();
        }
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
        return Promise.reject(res);
      })
      .then((cData) => {
        if (cData.message === "Container already exists") {
          setEnvs([{ name: "", value: "" }]);
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
          setData({
            containerName: "",
            imgTag: "",
            dockerRepoURL: "",
            enabled: false,
            selectedItem: null,
          });
          navigate(configPages.SERVICES.path);
        }
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="ml-12 mt-[22px]">
        <button>
          <Link
            to={"/service/new/docker-images"}
            className="text-white text-sm font-medium flex gap-2"
          >
            <img src={ArrowLeft} alt="" /> Back
          </Link>
        </button>
      </div>
      <div className="flex">
        <div className="m-12 max-w-[358px] w-full">
          <p className="text-2xl font-semibold text-[#EDEDED]">
            Create your container
          </p>
          <p className="text-sm font-normal text-[#F1F1FF99] mb-[28px]">
            Bring any docker images & deploy on exopods in seconds
          </p>
          <CompletedProcess
            heading="Docker Configure image"
            description="Specify how Exopods will build your site."
            inProcess={false}
            step={1}
          />
          <Dots />
          <CurrentProcess
            heading="Docker Configure"
            description="Specify how Exopods will build your site."
            inProcess={true}
            step={2}
          />
        </div>
        <div className="m-12 p-8 w-full border border-[#BBBBBB26] rounded-[9px]">
          <div className="mb-6">
            <h3 className="text-[#EDEDED] text-[22px] font-medium">
              Configure Deployment
            </h3>
            <p className="text-[#F1F1FF99] text-[14px]">
              Please follow the steps to configure your Project and deploy it.
            </p>
          </div>
          <section>
            <form action="">
              <div>
                <label
                  htmlFor="select-service"
                  className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block"
                >
                  Port <span className="text-red-500 text-base"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="8080"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none px-3 py-3 rounded-lg w-full text-sm"
                  name="deployment-name"
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="select-service"
                  className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block"
                >
                  Command
                </label>
                <input
                  type="text"
                  placeholder="npm run dev"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none px-3 py-3 rounded-lg w-full text-sm"
                  name="deployment-name"
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="select-service"
                  className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block"
                >
                  Arguments
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={args}
                  onChange={(e) => setArgs(e.target.value)}
                  className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none px-3 py-3 rounded-lg w-full text-sm"
                  name="deployment-name"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block">
                  Environment Variables 
                </label>
                <textarea
                  name="envs"
                  id="envs"
                  value={envsContent}
                  onChange={(e) => setEnvsContent(e.target.value)}
                  // onInput={handleEnvsInput}
                  // ref={envstextareaRef}
                  rows={7}
                  placeholder="ENV_NAME=ENV_VALUE"
                  className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none px-3 py-3 rounded-lg w-full text-sm"
                ></textarea>
              </div>

              <div className="mt-3">
                <span className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block">
                  Pricing Configuration <span className="text-red-500 text-base"> *</span>
                </span>
                <div className="flex flex-col items-start xl:flex-row gap-[30px] justify-start">
                  {presetsData.map((item: any) => (
                    <div
                      key={item._id}
                      onClick={() => handlePricing(item._id)}
                      className={`cursor-pointer flex-1 ${
                        presetId === item._id
                          ? "border-red-500"
                          : "border-[#BBBBBB1F]"
                      }`}
                    >
                      <PriceBox
                        name={item.name}
                        costPerHour={item.costPerHour}
                        info={item.info}
                        className={`${
                          presetId === item._id
                            ? "border-[#08A593]"
                            : "border-[#BBBBBB1F]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <span className="text-red-500 text-sm mt-3 inline-block">
                  {cCWarning}
                </span>
              </div>

              <div className="mt-12">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCreateContainerCheck();
                  }}
                  type="submit"
                  className="mb-8 text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] hover:!bg-[#fff] ease-in-out hover:text-[#000] text-sm font-medium"
                  style={{
                    background: `linear-gradient(90deg, rgba(26, 115, 232, 0.05) 0%, rgba(240, 40, 73, 0.05) 54%, rgba(133, 59, 206, 0.05) 98.5%)`,
                  }}
                >
                  Deploy
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
