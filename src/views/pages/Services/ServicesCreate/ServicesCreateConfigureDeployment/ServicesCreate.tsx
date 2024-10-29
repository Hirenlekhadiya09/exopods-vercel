import { useLocation, useNavigate } from "react-router-dom";
import {
  Dots,
  CurrentProcess,
  YetToCompleteProcess,
  DeployProgress,
  GitRepoCard,
  CompletedProcess,
} from "pages/Services/_sections/DeployProgress";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { fetchPresetsData } from "pages/Services/_components/presetsData";
import useUserCredits from "pages/contexts/useUserCredits";

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

export default function ServicesCreate() {
  const {
    state: { selectedRepo, selectedBranch, deploymentName, ownerName },
  } = useLocation();
  const [port, setPort] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [args, setArgs] = useState<string>("");
  const [envsContent, setEnvsContent] = useState("");
  const [presetsData, setPresetsData] = useState([]);
  const [presetId, setPresetId] = useState("");
  const [presetPricePerMinute, setPresetPicePerMinute] = useState("");
  const [cCWarning, setCCWarning] = useState("");
  const envstextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const { credits } = useUserCredits();

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

  const handleEnvsInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEnvsContent(e.target.value);
    adjustEnvsTextareaHeight();
  };

  const adjustEnvsTextareaHeight = () => {
    if (envstextareaRef.current) {
      envstextareaRef.current.style.height = "auto";
      envstextareaRef.current.style.height = `${envstextareaRef.current.scrollHeight}px`;
    }
  };

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

  function handlePricing(id: string) {
    const selectedPreset: any = presetsData.filter(
      (item: any) => item._id === id
    );
    setPresetId(selectedPreset[0]._id);
    setPresetPicePerMinute(selectedPreset[0].costPerMinute);
  }

  function handleDeploy() {
    const requiredInitialCredits: number = Number(presetPricePerMinute) * 5;
    if (credits < requiredInitialCredits) {
      setCCWarning(
        "Enough credits not available, minimum 5 mins of credits are required to launch this pod"
      );
      return;
    }
    if (deploymentName !== "" && port !== "" && presetId !== "") {
      navigate("/services/new/github/golive", {
        state: {
          selectedRepo: selectedRepo,
          selectedBranch: selectedBranch,
          deploymentName: deploymentName,
          ownerName: ownerName,
          port: port,
          command: command,
          args: args,
          envs: formatEnvs(envsContent),
          presetId: presetId,
        },
      });
    } else if (deploymentName !== "" && port == "" && presetId !== "") {
      setCCWarning("Port is required for the deployment");
    } else if (deploymentName !== "" && port !== "" && presetId == "") {
      setCCWarning("Select Pricing Configuration.");
    } else {
      setCCWarning("Fill all required fields including Pricing Configuration.");
    }
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
            <CurrentProcess
              heading="Configure Deployment"
              description="Specify how Exopods will build your site. "
              inProcess={true}
              step={2}
            />
            <Dots />
            <YetToCompleteProcess
              heading="Go Live"
              description="Specify how Exopods will build your site. "
              inProcess={false}
              step={3}
            />
          </DeployProgress>
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
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleDeploy();
              }}
            >
              <div>
                <label
                  htmlFor="select-service"
                  className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block"
                >
                  Port
                </label>
                <input
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="8080"
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
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="npm run dev"
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
                  value={args}
                  onChange={(e) => setArgs(e.target.value)}
                  placeholder=""
                  className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none px-3 py-3 rounded-lg w-full text-sm"
                  name="deployment-name"
                  autoComplete="off"
                />
              </div>

              <div>
                <span className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block">
                  Environment Variables 
                </span>
                <textarea
                  name="envs"
                  id="envs"
                  value={envsContent}
                  onInput={handleEnvsInput}
                  ref={envstextareaRef}
                  placeholder="ENV_NAME=ENV_VALUE"
                  className="overflow-hidden border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none p-2 text-[#fff] text-sm rounded-lg bg-transparent w-full min-h-[150px] h-full"
                ></textarea>
              </div>

              <div className="mt-3">
                <span className="text-[#C4C4C4A8] text-[14px] font-normal mb-1 inline-block">
                  Pricing Configuration
                </span>
                <div className="flex flex-col items-start xl:flex-row gap-[30px] justify-start">
                  {presetsData.map((item: any) => (
                    <div
                      key={item._id}
                      onClick={() => handlePricing(item._id)}
                      className="flex-1 cursor-pointer"
                    >
                      <PriceBox
                        name={item.name}
                        costPerHour={item.costPerHour}
                        info={item.info}
                        className={`${
                          presetId === item._id
                            ? "border-[#1A73E8]"
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
