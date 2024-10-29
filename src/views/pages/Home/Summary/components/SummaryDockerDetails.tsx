import { useEffect, useState } from "react";
import InputDocker from "./InputDocker";
import TextAreaDocket from "./TextAreaDocket";

interface SummaryDockerDetailsProps {
  activeRevision?: {
    port?: string;
    command?: string;
    args?: string;
    env?: { name: string; value: string }[];
  };
  onUpdate?: (updatedData: any) => void;
}
const SummaryDockerDetails: React.FC<SummaryDockerDetailsProps> = ({
  activeRevision,
  onUpdate,
}) => {
  const [dockerDetails, setDockerDetails] = useState({
    port: "",
    command: "",
    args: "",
    env: [] as { name: string; value: string }[],
  });
  const [envString, setEnvString] = useState("");

  useEffect(() => {
    if (activeRevision) {
      setDockerDetails({
        port: activeRevision.port || "",
        command: activeRevision.command || "",
        args: activeRevision.args || "",
        env: activeRevision.env || [],
      });

      setEnvString(
        activeRevision.env
          ? activeRevision.env
              .map((envVar) => `${envVar.name}=${envVar.value}`)
              .join("\n")
          : ""
      );
    }
  }, [activeRevision]);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(dockerDetails);
    }
  }, [dockerDetails]);

  const handleEnvChange = (newValue: string) => {
    setEnvString(newValue);
    const envArray = newValue
      .split("\n")
      .map((line) => {
        const [name, value] = line.split("=");
        return { name: name.trim(), value: value?.trim() };
      })
      .filter((env) => env.name && env.value);
    setDockerDetails((prev) => ({
      ...prev,
      env: envArray,
    }));
  };
  const handleValueChange =
    (field: keyof typeof dockerDetails) => (newValue: string) => {
      setDockerDetails((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    };
  return (
    <>
      <div>
        <p className="text-2xl text-[#EDEDED] font-semibold">
          Docker Configurations
        </p>
        <p className="text-sm font-normal text-[#F1F1FF99]">
          Please follow the steps to configure your Project and deploy it.
        </p>
      </div>
      <div className="flex flex-col gap-[25px] ">
        <div className="mt-[14px]">
          <InputDocker
            editable={true}
            deploymentName="Port"
            learnMoreLink=""
            placeholder="8088"
            value={dockerDetails?.port}
            onValueChange={handleValueChange("port")}
          />
        </div>
        <InputDocker
          editable={true}
          deploymentName="Command"
          learnMoreLink=""
          placeholder="expressjs-cn8x-other"
          value={dockerDetails?.command}
          onValueChange={handleValueChange("command")}
        />
        <InputDocker
          deploymentName="Arguments"
          learnMoreLink=""
          editable={true}
          placeholder="expressjs-cn8x-other"
          value={dockerDetails?.args}
          onValueChange={handleValueChange("args")}
        />
        <TextAreaDocket
          editable={true}
          deploymentName="Environment Variable"
          learnMoreLink=""
          placeholder="ENV_NAME=value"
          value={envString}
          onValueChange={handleEnvChange}
        />

        {/* <div className="w-full">
          <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-bl-none rounded-br-none ">
            <div className="flex gap-1">
              <label
                htmlFor=""
                className="text-sm font-normal text-[#C4C4C4A8]"
              >
                Environment Variable
              </label>
              <img src="/src/assets/icons/helpicon.svg" alt="" />
            </div>
            <input
              type="text"
              placeholder="expressjs-cn8x-other"
              className="bg-[#BBBBBB0A] mt-[4px] text-white w-full px-3 py-4 rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
            />
          </div>
          <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-tl-none rounded-tr-none border-t-0">
            <div className="flex gap-1 items-center">
              <p className="text-[#C4C4C4A8] text-sm font-normal">
                Learn more about
              </p>
              <div className="flex gap-1 cursor-pointer">
                <span className="text-[#1A73E8] text-sm font-normal">
                  Environment Variable
                </span>
                <img src="/src/assets/icons/learnMore.svg" alt="" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SummaryDockerDetails;
