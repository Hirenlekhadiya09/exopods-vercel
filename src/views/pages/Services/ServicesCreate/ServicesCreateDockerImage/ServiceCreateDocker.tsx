import { Switch } from "@headlessui/react";
import {
  CurrentProcess,
  Dots,
  YetToCompleteProcess,
} from "pages/Services/_sections/DeployProgress";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNewModal from "./AddNewModal";
import { manageData } from "pages/contexts/dockerContext";
import ArrowLeft from "assets/icons/arrow-left.svg";
import OtherIcon from "assets/icons/otherIcon.svg";
import HelpIcon from "assets/icons/helpicon.svg";
import Chevron from "assets/icons/chevron.svg";
import PlusIcon from "assets/icons/plusIcon.svg";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

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

const NameData = [
  "happy",
  "brave",
  "calm",
  "clever",
  "curious",
  "grace",
  "honest",
  "humble",
  "joyful",
  "kind",
  "loyal",
  "modest",
  "noble",
  "polite",
  "proud",
  "reliable",
  "wise",
  "zeal",
  "alert",
  "brisk",
  "cheer",
  "eager",
  "faith",
  "fierce",
  "free",
  "glad",
  "keen",
  "lively",
  "merry",
  "quick",
  "quiet",
  "sharp",
  "smart",
  "swift",
  "bold",
  "fair",
  "just",
  "calm",
  "chill",
  "cool",
  "crisp",
  "dear",
  "firm",
  "funny",
  "gentle",
  "good",
  "grave",
  "jolly",
  "meek",
  "mild",
  "plain",
  "sharp",
  "stern",
  "still",
  "tender",
  "upbeat",
  "valiant",
  "witty",
  "charm",
  "diligent",
  "dedicate",
  "humor",
  "warm",
  "zealous",
  "thankful",
  "loving",
  "friendly",
  "helpful",
  "confident",
  "daring",
  "courage",
  "patient",
  "inspire",
  "affection",
  "careful",
  "sincere",
  "grateful",
  "thoughtful",
  "compassion",
  "enthusiastic",
  "adaptable",
  "resilient",
  "tolerant",
  "considerate",
  "resourceful",
  "optimist",
  "motivated",
  "cheerful",
  "generous",
  "flexible",
  "humility",
  "passionate",
  "supportive",
  "respectful",
  "accountable",
  "forgiving",
];

const NameExt = [
  "cat",
  "dog",
  "fox",
  "wolf",
  "bear",
  "lion",
  "tiger",
  "shark",
  "zebra",
  "horse",
  "rhino",
  "whale",
  "cobra",
  "snake",
  "mouse",
  "deer",
  "sheep",
  "goat",
  "otter",
  "panda",
  "lemur",
  "sloth",
  "mole",
  "lynx",
  "bat",
  "frog",
  "boar",
  "giraffe",
  "koala",
  "llama",
  "ferret",
  "camel",
  "gecko",
  "finch",
  "quail",
  "eagle",
  "dove",
  "swan",
  "crane",
  "lark",
  "stork",
  "beetle",
  "bison",
  "skunk",
  "moth",
  "lynx",
  "crab",
  "bass",
  "mink",
  "snail",
  "squid",
  "clam",
  "gnat",
  "mule",
  "newt",
  "shrew",
  "dingo",
  "manta",
  "guppy",
  "shear",
  "finch",
  "moose",
  "otter",
  "hyena",
  "wasp",
  "midge",
  "toad",
  "robin",
  "koala",
  "ibex",
  "civet",
  "sable",
  "bongo",
  "macaw",
  "raven",
  "swift",
  "viper",
  "ibis",
  "stoat",
  "crow",
  "snake",
  "leech",
  "kudu",
  "swift",
  "finch",
  "crane",
  "gull",
  "dingo",
  "beetle",
  "bug",
  "mink",
  "raven",
  "crow",
  "gull",
  "jay",
  "finch",
];

// interface SecretItem {
//   id: number;
//   type: SecretType;
//   secret_name: string;
// }

const ServiceCreateDocker = () => {
  const [openSelect, setOpenSelect] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [buttonState, setButtonState] = useState("test");
  const { data, updateData, cCWarning, setCCWarning } = manageData();
  const [secretList, setSecretList] = useState<any[]>([]);
  const navigate = useNavigate();

  // const [containerName, setContainerName] = useState<string | undefined>(
  //   undefined
  // );
  // const [dockerRepoURL, setDockerRepoURL] = useState("");
  // const [imgTag, setImgTag] = useState("");

  useEffect(() => {
    const randomDataIndex = Math.floor(Math.random() * NameData.length);
    const randomExtIndex = Math.floor(Math.random() * NameExt.length);

    const generatedRandomName = `${NameData[randomDataIndex]}-${NameExt[randomExtIndex]}`;
    updateData("containerName", generatedRandomName);
  }, []);

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

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      fetchSecretList();
    }
  };

  const openOption = () => {
    setOpenSelect(!openSelect);
  };

  const handleSelect = (item: any) => {
    updateData("selectedItem", item);
    setOpenSelect(false);
  };

  // const containerData = () => {
  //   const Data = {
  //     containerName,
  //     imgTag,
  //     dockerRepoURL,
  //   };
  //   setData(Data);
  // };

  // useEffect(() => {
  //   containerData();
  // }, [imgTag]);

  const openModal = () => setIsOpen(true);

  // const handleClick = () => {
  //   setButtonState("pulling");
  //   setTimeout(() => {
  //     setButtonState("failed");
  //     setButtonState("success");
  //   }, 3000);
  // };

  const handleValidationAndProceed = () => {
    const requiredInitialCredits = 5;
    const credits = 10;

    if (credits < requiredInitialCredits) {
      setCCWarning(
        "Enough credits not available, minimum 5 mins of credits are required to launch this pod."
      );
      return;
    }

    if (
      data.containerName &&
      data.dockerRepoURL &&
      data.imgTag &&
      (data.enabled ? data.selectedItem : true)
    ) {
      setCCWarning(null);
      navigate("/services/new/docker/deployment");
    } else {
      setCCWarning("Fill all required fields including Docker Pull Secrets.");
    }
  };

  const imageSrc = data.selectedItem
    ? typeToImageMap[data.selectedItem.type as SecretType] || otherIcon
    : otherIcon;

  return (
    <>
      <div className="mt-[35px]">
        <div className="ml-[23px]">
          <button>
            <Link
              to={"/services"}
              className="text-white text-sm font-medium flex gap-2"
            >
              <img src={ArrowLeft} alt="" /> Back
            </Link>
          </button>
        </div>
        <div className="flex md:flex-col lg:flex-row gap-[47px] mx-[32px] mt-[22px]">
          <div className="max-w-[358px]">
            <p className="text-2xl font-semibold text-[#EDEDED]">
              Create your container
            </p>
            <p className="text-sm font-normal text-[#F1F1FF99]">
              Bring any docker images & deploy on exopods in seconds
            </p>
            <div className="mt-[31px]">
              <CurrentProcess
                heading="Configure Docker image"
                description="Setup docker image pull behaviour."
                inProcess={true}
                step={1}
              />
              <Dots />
              <YetToCompleteProcess
                heading="Configure Deployment"
                description="Specify how Exopods will build your site."
                inProcess={false}
                step={2}
              />
              {data.selectedItem && (
                <>
                  <Dots />
                  <YetToCompleteProcess
                    heading="Go Live"
                    description="Specify how Exopods will build your site."
                    inProcess={false}
                    step={3}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex-1 border border-[#BBBBBB26] rounded-[9px] p-[32px] flex flex-col gap-[18px]">
            <div className="">
              <p className="text-2xl font-semibold text-[#EDEDED]">
                Configure Docker image
              </p>
              <p className="text-sm font-normal text-[#F1F1FF99]">
                Specify docker image registry & image details
              </p>
            </div>
            <div className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label
                    htmlFor=""
                    className="text-[#C4C4C4A8] font-normal text-sm"
                  >
                    Service Name <span className="text-red-700 "> * </span>
                  </label>
                  <img src={HelpIcon} alt="" />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    value={data.containerName}
                    onChange={(e) =>
                      updateData("containerName", e.target.value)
                    }
                    placeholder="e.g.  Name123"
                    className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-1 w-1/2">
                  <div className="flex gap-1">
                    <label
                      htmlFor=""
                      className="text-[#C4C4C4A8] font-normal text-sm"
                    >
                      Docker Repo/Registory URL{" "}
                      <span className="text-red-700 "> * </span>
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="dockerRepoURL"
                      value={data.dockerRepoURL}
                      onChange={(e) =>
                        updateData("dockerRepoURL", e.target.value)
                      }
                      placeholder="e.g. <account-id>.dkr.ecr.<region>.amazonaws.com/<repository-name>"
                      className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <div className="flex gap-1">
                    <label
                      htmlFor=""
                      className="text-[#C4C4C4A8] font-normal text-sm"
                    >
                      Image Tag<span className="text-red-700 "> * </span>
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="imgTag"
                      value={data.imgTag}
                      onChange={(e) => updateData("imgTag", e.target.value)}
                      placeholder="e.g. latest"
                      className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#C4C4C4A8] font-normal text-sm">
                  Private registry
                </p>
                <div className="py-4 px-3 flex gap-3">
                  <Switch
                    checked={data.enabled}
                    onChange={(e) => updateData("enabled", e)}
                    className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      data.enabled ? "bg-[#1A73E8]" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        data.enabled ? "translate-x-5 " : "translate-x-1"
                      }`}
                    />
                  </Switch>
                  <p className="text-[13px] font-normal text-[#F1F1FF99]">
                    Pull from private docker repo/registry. e.g. AWS ECR, Google
                    GCR, JFrog, DockerHub etc
                  </p>
                </div>
              </div>
              {data.enabled && (
                <div>
                  <p className="text-[#C4C4C4A8] font-normal text-sm pb-[2px]">
                    Create/Select Docker Pull Secrets
                  </p>
                  <div className="flex gap-[10px]">
                    <div
                      className="px-3 py-[10px] border border-[#BBBBBB1F] rounded-md flex-1"
                      onClick={openOption}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 cursor-pointer">
                          {data.selectedItem ? (
                            <>
                              <img
                                src={imageSrc}
                                alt={data.selectedItem.type}
                                className="w-[30px] h-[30px]"
                              />
                              <p className="text-sm font-normal text-white">
                                {data.selectedItem.secret_name}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm font-normal text-[#F1F1FF99]">
                              Select
                            </p>
                          )}
                        </div>
                        <div className={openSelect ? "rotate-90" : "rotate-0"}>
                          <img src={Chevron} alt="" />
                        </div>
                      </div>
                    </div>
                    {/* {selectedItem && (
                      <>
                        {buttonState === "test" && (
                          <button
                            className={`py-[10px] px-[18px] border rounded-md`}
                            onClick={handleClick}
                          >
                            <div className="flex gap-2">
                              <img
                                src="/assets/icons/testIcon.svg"
                                alt="Test Icon"
                              />
                              <span className="text-white text-sm font-normal">
                                Test
                              </span>
                            </div>
                          </button>
                        )}

                        {buttonState === "pulling" && (
                          <button className="py-[10px] px-[18px] border border-[#63C174] rounded-md">
                            <div className="flex gap-2 items-center">
                              <div className="animate-spin w-[15px] h-[15px] border border-dashed border-[#63C174] rounded-full"></div>
                              <span className="text-[#63C174] text-sm font-normal">
                                Pulling
                              </span>
                            </div>
                          </button>
                        )}

                        {buttonState === "success" && (
                          <button className="py-[10px] px-[18px] border border-[#63C174] rounded-md">
                            <div className="flex gap-2">
                              <img
                                src="/assets/icons/sucessIcon.svg"
                                alt="Success Icon"
                              />
                              <span className="text-[#63C174] text-sm font-normal">
                                Success
                              </span>
                            </div>
                          </button>
                        )}

                        {buttonState === "failed" && (
                          <button className="py-[10px] px-[18px] border border-[#F02849] rounded-md">
                            <div className="flex gap-2">
                              <img
                                src="/assets/icons/failedIcon.svg"
                                alt="Failed Icon"
                              />
                              <span className="text-[#F02849] text-sm font-normal">
                                Failed!
                              </span>
                            </div>
                          </button>
                        )}
                      </>
                    )} */}
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
                                    OtherIcon
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
                        <div className="border-t border-t-[#BBBBBB1F] mx-[6px]">
                          <div
                            className="flex gap-[6px] px-[14px] py-2 cursor-pointer"
                            onClick={openModal}
                          >
                            <img src={PlusIcon} alt="" />
                            <p className="text-sm text-[#0070F3] font-normal">
                              Add new
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {cCWarning && (
                <div>
                  <span className="text-red-500 text-sm inline-block">
                    {cCWarning}
                  </span>
                </div>
              )}
              <div>
                <button
                  className="text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] hover:!bg-[#fff] ease-in-out hover:text-[#000] text-sm font-medium bg-[linear-gradient(90deg,rgba(26,115,232,0.05)0%,rgba(240,40,73,0.05)54%,rgba(133,59,206,0.05)98.5%)]"
                  onClick={handleValidationAndProceed}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNewModal isOpen={isOpen} setIsOpen={handleModalClose} />
    </>
  );
};

export default ServiceCreateDocker;
