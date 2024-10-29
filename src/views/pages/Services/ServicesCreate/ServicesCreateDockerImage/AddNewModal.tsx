import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JfrogIcon from "assets/icons/jfrog.svg";
import AwsIcon from "assets/icons/aws.svg";
import GithubIcon from "assets/icons/GitHub.svg";
import OtherIcon from "assets/icons/otherIcon.svg";
import CloseIcon from "assets/icons/closeIcon.svg";
import HelpIcon from "assets/icons/helpicon.svg";
import Chevron from "assets/icons/chevron.svg";
import LearnMore from "assets/icons/learnMore.svg";

const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

interface AddNewModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
interface DockerData {
  name: string;
  url: string;
  email: string;
  username: string;
  password: string;
  type: string;
}
const OptionMenu = [
  {
    src: GithubIcon,
    name: "Google GCP",
  },
  {
    src: AwsIcon,
    name: "AWS ECR",
  },
  {
    src: JfrogIcon,
    name: "JFrog",
  },
  {
    src: OtherIcon,
    name: "Other",
  },
];

const AddNewModal: React.FC<AddNewModalProps> = ({ isOpen, setIsOpen }) => {
  const [openSelect, setopenSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState(OptionMenu[0]);
  const [dockerData, setDockerData] = useState<DockerData>({
    name: "",
    url: "",
    email: "",
    username: "",
    password: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("🚀 ~ error:", error);
  const [cCWarning, setCCWarning] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setDockerData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const openOption = () => {
    setopenSelect(!openSelect);
  };

  const handleSelect = (item: (typeof OptionMenu)[0]) => {
    setSelectedItem(item);
    setDockerData((prevData) => ({
      ...prevData,
      type: item.name,
    }));
    setopenSelect(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = window.localStorage.getItem("access_token");

    const requiredFields = [
      "name",
      "url",
      "email",
      "username",
      "password",
      "type",
    ];
    // const missingFields = requiredFields.filter((field) => !dockerData[field]);
    const missingFields = requiredFields.filter(
      (field) => !dockerData[field as keyof DockerData]
    );
    if (missingFields.length > 0) {
      setCCWarning("Fill all required fields including Docker Pull Secrets.");
      return;
    }

    const credits = 10;
    const requiredInitialCredits = 5;
    if (credits < requiredInitialCredits) {
      setCCWarning(
        "Enough credits not available, minimum 5 mins of credits are required to launch this pod."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setCCWarning(null);

    try {
      const response = await fetch(`${exoApiUrl}explore/secret`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(dockerData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      setIsOpen(false);
      navigate("/service/new/docker-images");
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm	" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className=" max-w-[517px] w-full ms-auto !bg-[#0C1015] rounded-[9px] border-l border-l-[#BBBBBB26]">
          <div className="p-[66px_23px_66px_32px] bg-[#0C1015] z-[9999] relative overflow-y-auto h-screen">
            <div className="flex items-center justify-between ">
              <div>
                <p className="font-semibold text-2xl text-[#EDEDED]">
                  Add Docker image pull Secret
                </p>
                <p className="font-normal text-sm text-[#F1F1FF99]">
                  Add your docker image pull secrets for your private registry.
                </p>
              </div>
              <div onClick={() => setIsOpen(false)}>
                <img src={CloseIcon} alt="" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="pt-[18px]">
              <div className="flex flex-col gap-[22px]">
                <div className="flex gap-1 pb-1">
                  <label
                    htmlFor=""
                    className="text-[#C4C4C4A8] font-normal text-sm"
                  >
                    Registry Provider
                  </label>
                  <img src={HelpIcon} alt="" />
                </div>
                <div>
                  <div
                    className="p-3 border border-[#BBBBBB1F] rounded-md "
                    onClick={openOption}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <img
                          src={selectedItem.src}
                          alt={selectedItem.name}
                          className="w-[30px] h-[30px]"
                        />
                        <p className="text-sm font-normal text-white">
                          {selectedItem.name}
                        </p>
                      </div>
                      <div className={openSelect ? "rotate-90" : "rotate-0"}>
                        <img src={Chevron} alt="" />
                      </div>
                    </div>
                  </div>
                  {openSelect && (
                    <>
                      <div className=" border border-[#BBBBBB1F] rounded-md mt-2">
                        {OptionMenu.map((item) => {
                          return (
                            <div
                              className="p-[10px_10px_10px_8px]"
                              onClick={() => handleSelect(item)}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <img
                                  src={item.src}
                                  alt=""
                                  className="w-[30px] h-[30px]"
                                />
                                <p className="text-sm font-normal text-white">
                                  {" "}
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <label
                      htmlFor=""
                      className="text-[#C4C4C4A8] font-normal text-sm"
                    >
                      Secret Name <span className="text-red-700 "> * </span>
                    </label>
                    <img src={HelpIcon} alt="" />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="e.g. gcr-dev-secret"
                      className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <label
                      htmlFor=""
                      className="text-[#C4C4C4A8] font-normal text-sm"
                    >
                      Repo/Registry URL{" "}
                      <span className="text-red-700 "> * </span>
                    </label>
                    <img src={HelpIcon} alt="" />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="url"
                      onChange={handleChange}
                      placeholder="e.g.  <account-id>.dkr.ecr.<region>.amazonaws.com/<registory-name>"
                      className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                    />
                  </div>
                </div>
                <div className="border border-[#BBBBBB1F] rounded-lg p-[18px]">
                  <div className="flex flex-col gap-[22px]">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex gap-1">
                          <label
                            htmlFor=""
                            className="text-[#C4C4C4A8] font-normal text-sm"
                          >
                            Username <span className="text-red-700 "> * </span>
                          </label>
                        </div>
                        <div className="w-full">
                          <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            placeholder="e.g.  AWS"
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
                            Email id <span className="text-red-700 "> * </span>
                          </label>
                        </div>
                        <div className="w-full">
                          <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            placeholder="e.g.  hello@xyz.com"
                            className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label
                            htmlFor=""
                            className="text-[#C4C4C4A8] font-normal text-sm"
                          >
                            Password <span className="text-red-700 "> * </span>
                          </label>
                        </div>
                        <div className="w-full">
                          <input
                            type="text"
                            name="password"
                            onChange={handleChange}
                            placeholder="e.g.  Your Password"
                            className="text-white w-full px-3 py-3 bg-transparent rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
                          />
                        </div>
                        <p className="text-xs text-[#C4C4C4A8] font-normal flex gap-1">
                          Retrieve username or password for remote registry.
                          <span className="text-[#1A73E8] flex gap-1">
                            Learn more
                            <img src={LearnMore} alt="" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {cCWarning && (
                  <div>
                    <span className="text-red-500 text-sm inline-block">
                      {cCWarning}
                    </span>
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] hover:!bg-[#fff] ease-in-out hover:text-[#000] text-sm font-medium bg-[linear-gradient(90deg,rgba(26,115,232,0.05)0%,rgba(240,40,73,0.05)54%,rgba(133,59,206,0.05)98.5%)]"
                    disabled={isLoading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddNewModal;
