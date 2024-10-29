import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import InputDocker from "./InputDocker";
import learnMOreIcon from "/src/assets/icons/learnMore.svg";

type SecretType = "JFrog" | "AWS ECR" | "Google GCP" | "Other";

import jfrogIcon from "assets/icons/jfrog.svg";
import awsIcon from "assets/icons/aws.svg";
import githubIcon from "assets/icons/GitHub.svg";
import otherIcon from "assets/icons/otherIcon.svg";

const typeToImageMap: Record<SecretType, string> = {
  JFrog: jfrogIcon,
  "AWS ECR": awsIcon,
  "Google GCP": githubIcon,
  Other: otherIcon,
};

interface Secret {
  id: string;
  type: SecretType;
  secret_name: string;
}

interface SummaryData {
  image?: string;
  privateRegistry?: boolean;
  container_name?: string;
  subdomain?: string;
  selectedSecret?: Secret | null;
}

interface SummaryDockerConfigurationProps {
  summaryData: SummaryData;
  activeRevision?: {
    image_tag?: string;
    port?: string;
    command?: string;
    args?: string;
    env?: { name: string; value: string }[];
  };
  onUpdate?: (updatedData: any) => void;
}

const SummaryDockerConfiguration = ({
  summaryData,
  onUpdate,
  activeRevision,
}: SummaryDockerConfigurationProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [dockerConfig, setDockerConfig] = useState<{
    repoTag: string;
    privateRegistry: boolean;
    selectedSecret: Secret | null;
  }>({
    repoTag: activeRevision?.image_tag || "",
    privateRegistry: false,
    selectedSecret: null,
  });
  const [secretList, setSecretList] = useState<any[]>([]);
  const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

  const openOption = () => {
    setOpenSelect(!openSelect);
  };

  useEffect(() => {
    setDockerConfig({
      repoTag: activeRevision?.image_tag || "",
      privateRegistry: false,
      selectedSecret: null,
    });
  }, [summaryData, activeRevision]);

  const handleSelect = (item: Secret) => {
    const updatedConfig = {
      ...dockerConfig,
      selectedSecret: item,
    };
    setDockerConfig(updatedConfig);

    if (onUpdate) {
      onUpdate({
        ...summaryData,
        selectedSecret: item.secret_name,
      });
    }

    setOpenSelect(false);
  };

  const fetchSecretList = () => {
    const accessToken = window.localStorage.getItem("access_token");
    fetch(`${exoApiUrl}explore/secret`, {
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
        setSecretList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSecretList();
  }, []);

  const imageSrc = dockerConfig.selectedSecret
    ? typeToImageMap[dockerConfig.selectedSecret.type as SecretType] ||
      otherIcon
    : otherIcon;

  const handleInputChange = (key: string, value: any) => {
    const updatedConfig = {
      ...dockerConfig,
      [key]: value,
    };
    setDockerConfig(updatedConfig);

    if (onUpdate) {
      onUpdate({
        ...summaryData,
        image_tag: updatedConfig.repoTag,
      });
    }
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
            deploymentName="Deployment Name"
            learnMoreLink=""
            placeholder="expressjs-cn8x-other"
            value={summaryData?.container_name || ""}
            disabled
          />
        </div>
        <div className="w-full">
          <div>
            <div>
              <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-bl-none rounded-br-none ">
                <div className="flex gap-[25px]">
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <label
                        htmlFor=""
                        className="text-sm font-normal text-[#C4C4C4A8]"
                      >
                        Repo URL
                      </label>
                    </div>
                    <input
                      type="text"
                      value={summaryData?.image}
                      placeholder="Other"
                      className="bg-[#BBBBBB0A] mt-[4px] text-white w-full px-3 py-4 rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <label
                        htmlFor=""
                        className="text-sm font-normal text-[#C4C4C4A8]"
                      >
                        Repo Tag
                      </label>
                    </div>
                    <input
                      type="text"
                      value={dockerConfig.repoTag}
                      onChange={(e) =>
                        handleInputChange("repoTag", e.target.value)
                      }
                      placeholder="Other"
                      className="bg-[#BBBBBB0A] mt-[4px] text-white w-full px-3 py-4 rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-tl-none rounded-tr-none border-t-0">
              <div className="flex gap-1 items-center">
                <p className="text-[#C4C4C4A8] text-sm font-normal">
                  Learn more about
                </p>
                <div className="flex gap-1 cursor-pointer">
                  <span className="text-[#1A73E8] text-sm font-normal">
                    Repo URl/Tag
                  </span>
                  <img src={learnMOreIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[14px] w-full">
          <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-bl-none rounded-br-none ">
            <div className="flex gap-1">
              <label
                htmlFor=""
                className="text-sm font-normal text-[#C4C4C4A8]"
              >
                Private Registry
              </label>
            </div>
            <div className="flex gap-[13px] items-center px-3 py-4">
              <Switch
                checked={dockerConfig.privateRegistry}
                onChange={(enabled) =>
                  handleInputChange("privateRegistry", enabled)
                }
                className={`${
                  dockerConfig.privateRegistry ? "bg-[#1A73E8]" : ""
                } relative inline-flex h-[24px] w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    dockerConfig.privateRegistry
                      ? "translate-x-6"
                      : "translate-x-0"
                  } pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className="text-[13px] font-normal text-[#F1F1FF99]">
                Pull from private docker repo registry. e.g. AWS ECR, Google
                GCR, JFrog, DockerHub etc
              </p>
            </div>
            {dockerConfig.privateRegistry && (
              <>
                <div className="flex gap-1">
                  <label
                    htmlFor=""
                    className="text-sm font-normal text-[#C4C4C4A8]"
                  >
                    Secret
                  </label>
                </div>
                <div className="flex gap-[10px]">
                  <div
                    className="px-3 py-[10px] border border-[#BBBBBB1F] rounded-md flex-1"
                    onClick={openOption}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 cursor-pointer">
                        {dockerConfig.selectedSecret ? (
                          <>
                            <img
                              src={imageSrc}
                              alt={dockerConfig.selectedSecret?.type}
                              className="w-[30px] h-[30px]"
                            />
                            <p className="text-sm font-normal text-white">
                              {dockerConfig.selectedSecret?.secret_name}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-normal text-[#F1F1FF99]">
                            Select
                          </p>
                        )}
                      </div>
                      <div className={openSelect ? "rotate-90" : "rotate-0"}>
                        <img src={""} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                {openSelect && (
                  <>
                    <div className=" relative border border-[#BBBBBB1F] rounded-md mt-2 ">
                      <div className="max-h-[300px] overflow-y-auto">
                        {secretList.map((item) => (
                          <div
                            key={item.id}
                            className="p-[10px_10px_10px_8px]"
                            onClick={() => handleSelect(item)}
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              <img
                                src={
                                  typeToImageMap[item.type as SecretType] ||
                                  otherIcon
                                }
                                alt={item.type}
                                className="w-[30px] h-[30px]"
                              />
                              <p className="text-sm font-normal text-white">
                                {item.secret_name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-tl-none rounded-tr-none border-t-0">
            <div className="flex gap-1 items-center">
              <p className="text-[#C4C4C4A8] text-sm font-normal">
                Learn more about
              </p>
              <div className="flex gap-1 cursor-pointer">
                <span className="text-[#1A73E8] text-sm font-normal">
                  Private Registry
                </span>
                <img src={learnMOreIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryDockerConfiguration;
