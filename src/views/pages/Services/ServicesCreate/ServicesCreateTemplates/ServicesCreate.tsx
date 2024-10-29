// import Button from "atoms/Button/Button";
import Input from "atoms/Input";
import Container from "atoms/Container";
import PageHeader from "molecules/PageHeader";
import { useState, useEffect, useRef, ChangeEvent } from "react";
// import Envs from "./Envs";
import { useNavigate } from "react-router-dom";
import { configPages } from "config/configPages";
import NukaCarousel from "nuka-carousel";
// import { useAuth0 } from "@auth0/auth0-react";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;
import {
  Price,
  PricingType,
  PricingFeature,
  PricingSuitable,
} from "pages/Home/_components/Pricing";
import useUserCredits from "pages/contexts/useUserCredits";
import dataLayerTrialEvent from "pages/Services/utils/dataLayerTrialEvent";

// TODO: Refactor once API ready
interface BoxProps {
  imageUrl: string;
  imageName: string;
}

function Box({ imageUrl, imageName }: BoxProps) {
  return (
    <div className="bg-[#24292f9e] rounded-xl h-12 fsm:h-14 px-2 fsm:px-3 flex items-center w-[130px] fsm:w-[150px] gap-2">
      <div className="bg-[#D7D7D7] rounded-full w-6 h-6 fsm:h-9 fsm:w-9 flex items-center justify-center overflow-hidden">
        <img src={imageUrl} alt="" className="h-full w-full" />
      </div>
      <h3 className="text-xs fsm:text-sm text-[#F0F0F0] font-['Poppins'] font-normal">
        {imageName}
      </h3>
    </div>
  );
}

interface PriceBoxProps {
  name: string;
  costPerHour: number;
  valueProp: string;
  info: string[];
  className: string;
}

function PriceBox({
  name,
  costPerHour,
  valueProp,
  info,
  className,
}: PriceBoxProps) {
  return (
    <div
      className={`${className} border-[1px] rounded-[18px] p-5 w-[350px] max-w-[100%]`}
    >
      <PricingType name={name} pricingPage={false} />
      <Price price={costPerHour.toString()} />
      <PricingSuitable type={valueProp} pricingPage={false} />
      <div className="flex flex-col gap-3 max-w-[400px] lg:max-w-[250px] py-7 xl:max-w-[400px]">
        <PricingFeature feature={info[0]} />
        <PricingFeature feature={info[1]} />
      </div>
    </div>
  );
}

function ServicesCreate() {
  const [envs, setEnvs]: any = useState([{ name: "", value: "" }]);
  const [envsContent, setEnvsContent] = useState("");
  const envstextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [containerName, setContainerName] = useState("");
  const [image, setImage] = useState("");
  const [imageTag, setImageTag] = useState("latest");
  const [port, setPort] = useState("");
  const [args, setArgs] = useState("");
  const [command, setCommand] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toolTipHover, setToolTipHover] = useState(false);
  const [publicImagesData, setPublicImagesData] = useState([]);
  const [presetsData, setPresetsData] = useState([]);
  const [presetId, setPresetId] = useState("");
  const [presetPricePerMinute, setPresetPicePerMinute] = useState("");
  const [cCWarning, setCCWarning] = useState("");
  const { credits, txnArray } = useUserCredits();
  const navigate = useNavigate();

  // const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const { isAuthenticated } = useAuth0();

  const accessToken = window.localStorage.getItem("access_token");

  const handleEnvsInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEnvsContent(e.target.value);
    adjustEnvsTextareaHeight();
  };

  const adjustEnvsTextareaHeight = () => {
    if (envstextareaRef.current) {
      envstextareaRef.current.style.height = "auto";
      envstextareaRef.current.style.height = `${envstextareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
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

  interface onClickProps {
    onClick: () => void;
  }

  const CustomNextButton = ({ onClick }: onClickProps) => {
    return (
      <button onClick={onClick} className="mr-[-30px]">
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.25939 0.128113C1.12502 0.128113 0.987499 0.181238 0.884375 0.284363C0.678124 0.490613 0.678124 0.828113 0.884375 1.03436L7.94375 8.09374L0.987499 15.05C0.781249 15.2562 0.781249 15.5937 0.987499 15.8C1.19375 16.0062 1.53125 16.0062 1.7375 15.8L9.07188 8.46874C9.27813 8.26249 9.27813 7.92499 9.07188 7.71874L1.6375 0.284363C1.53125 0.178113 1.39689 0.128113 1.25939 0.128113Z"
            fill="#fff"
          />
        </svg>
      </button>
    );
  };

  const CustomPrevButton = ({ onClick }: onClickProps) => {
    return (
      <button onClick={onClick} className="ml-[-18px] fsm:ml-[-30px]">
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.74061 15.8719C8.87498 15.8719 9.0125 15.8188 9.11563 15.7156C9.32188 15.5094 9.32188 15.1719 9.11563 14.9656L2.05625 7.90626L9.0125 0.950012C9.21875 0.743762 9.21875 0.406262 9.0125 0.200012C8.80625 -0.00623798 8.46875 -0.00623798 8.2625 0.200012L0.928125 7.53126C0.721875 7.73751 0.721875 8.07501 0.928125 8.28126L8.3625 15.7156C8.46875 15.8219 8.60311 15.8719 8.74061 15.8719Z"
            fill="#fff"
          />
        </svg>
      </button>
    );
  };

  useEffect(() => {
    handlePublicImages();

    fetch(`${exoApiUrl}presets`, {
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
        // console.log(res);
        setPresetsData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const slidesToShow = getSlidesToShow();

  function getSlidesToShow() {
    if (window.innerWidth >= 750) {
      return 4;
    } else if (window.innerWidth >= 550) {
      return 3;
    } else if (window.innerWidth >= 360) {
      return 2;
    } else {
      return 1;
    }
  }

  window.addEventListener("dblclick", () => {
    if (toolTipHover) {
      setToolTipHover(!toolTipHover);
    }
  });

  function handleCreateContainerCheck() {
    const requiredInitialCredits: number = Number(presetPricePerMinute) * 5;
    if (credits < requiredInitialCredits) {
      setCCWarning(
        "Enough credits not available, minimum 5 mins of credits are required to launch this pod"
      );
      return;
    }
    if (
      containerName !== "" &&
      image !== "" &&
      imageTag !== "" &&
      port !== "" &&
      presetId !== ""
      // isAuthenticated
    ) {
      handleCreateContainer();
    } else {
      setCCWarning("Fill all required fields including Pricing Configuration.");
    }
  }

  async function handleCreateContainer() {
    // const accessToken = await getAccessTokenSilently();
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
        container_name: containerName,
        image: image,
        image_tag: imageTag,
        port: parseInt(port),
        env: formatEnvs(envsContent),
        args: args,
        command: command,
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
        // console.log(cData);
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
          navigate(configPages.SERVICES.path);
        }
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async function handlePublicImages() {
    // const accessToken = await getAccessTokenSilently();
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}explore/images`;

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
      .then((piData) => {
        setPublicImagesData(piData.data);
      });
    // .catch((err: any) => {
    //   // console.log(err);
    // });
  }

  function handleImageClick(id: string) {
    const selectedImage: any = publicImagesData.filter(
      (item: any) => item._id === id
    );
    setCCWarning("");
    setContainerName(selectedImage[0].image_name);
    setImage(selectedImage[0].image_repo);
    setImageTag(selectedImage[0].tags[0].tag);
    if (selectedImage[0].port) {
      setPort(selectedImage[0].port);
    }
  }

  function handlePricing(id: string) {
    const selectedPreset: any = presetsData.filter(
      (item: any) => item._id === id
    );
    setPresetId(selectedPreset[0]._id);
    setPresetPicePerMinute(selectedPreset[0].costPerMinute);
  }

  if (isLoading)
    return (
      <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center">
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
  return (
    <Container className="mt-16 sm:mt-0">
      <section>
        {/* <PageHeader title="Choose Container" /> */}
        <div className="max-w-[350px]">
          <PageHeader title="Create your first Exopod">
            <p className="mt-2 opacity-[0.6] text-sm text-[#fff] font-normal w-max">
              Bring any docker images & deploy on exopods in seconds
            </p>
          </PageHeader>
        </div>
        <div className="max-w-[650px] ml-[18px] my-10 fsm:ml-[30px]">
          <NukaCarousel
            renderCenterRightControls={({ nextSlide }) => (
              <CustomNextButton onClick={nextSlide} />
            )}
            renderCenterLeftControls={({ previousSlide }) => (
              <CustomPrevButton onClick={previousSlide} />
            )}
            renderBottomCenterControls={() => null}
            wrapAround={true}
            slidesToShow={slidesToShow}
          >
            {publicImagesData.map((item: any) => (
              <div
                onClick={() => handleImageClick(item._id)}
                className="cursor-pointer"
              >
                <Box imageUrl={item.image_url} imageName={item.image_name} />
              </div>
            ))}
          </NukaCarousel>
        </div>
      </section>

      <section>
        {/* <PageHeader title="Create your first deployment">
                        <p className="mt-2">Bring any docker images & deploy on exopods in seconds</p>
                    </PageHeader> */}

        <div className="space-y-5 max-w-3xl mt-16">
          <div className="flex gap-4">
            <div>
              <Input
                value={containerName}
                onChange={(e) => setContainerName(e.target.value)}
                label="Service Name"
                placeholder="Enter your service name"
                className="py-3 text-sm w-[420px] max-w-[calc(100vw-50px)]"
                requiredInput
                toolTipContent="Enter any name for your service. Make sure if no other service exists with same name."
              />
            </div>
            <div></div>
          </div>

          <div className="flex flex-col fsm:flex-row gap-4">
            <div className="flex gap-4 fsm:gap-0">
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                label="Repo ID"
                placeholder="nginx"
                className="py-3 text-sm w-[420px] fsm:w-[202px] max-w-[calc(100vw-50px)]"
                requiredInput
                toolTipContent="Repo ID can have only lowercase letters & can contain / in the repo name."
              />
              <div></div>
            </div>
            <div className="flex gap-4 fsm:gap-0">
              <Input
                value={imageTag}
                onChange={(e) => setImageTag(e.target.value)}
                label="Tag"
                placeholder="latest"
                className="py-3 text-sm w-[420px] fsm:w-[202px] max-w-[calc(100vw-50px)]"
                requiredInput
                toolTipContent="Enter a tag name that exists in your registry, wrong tag can lead to failures."
              />
              <div></div>
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <Input
                value={port}
                onChange={(e) => {
                  const portVal: number = parseInt(e.target.value);
                  if (portVal >= 0 && portVal <= 65536) {
                    setPort(`${portVal}`);
                  } else {
                    setPort("");
                  }
                }}
                label="Port"
                placeholder="80"
                className="py-3 text-sm w-[420px] max-w-[calc(100vw-50px)]"
                requiredInput
                toolTipContent="Only numbers are allowed in port & make sure port is same as given in image."
              />
            </div>
            <div></div>
          </div>

          <div className="flex gap-4">
            <div>
              <Input
                onChange={(e) => setCommand(e.target.value)}
                label="Command"
                placeholder=""
                className="py-3 text-sm w-[420px] max-w-[calc(100vw-50px)]"
                toolTipContent="If you wish to change the container start command, please enter here"
              />
            </div>
            <div></div>
          </div>

          <div className="flex gap-4">
            <div>
              <Input
                onChange={(e) => setArgs(e.target.value)}
                label="ARGS"
                placeholder=""
                className="py-3 text-sm w-[420px] max-w-[calc(100vw-50px)]"
                toolTipContent="You can pass any command line args for your image using this option."
              />
            </div>
            <div></div>
          </div>

          <div>
            <div className="flex gap-[calc(100vw-210px)] fsm:gap-[calc(100vw-280px)] sm:gap-[367px]">
              <span className="text-[#FFFFFF80] block font-medium font-['Poppins'] mb-3">
                ENVS
              </span>
              <span
                className="relative mt-[6px]"
                onMouseEnter={() => setToolTipHover(true)}
                onMouseLeave={() => setToolTipHover(false)}
                onClick={() => {
                  setToolTipHover(!toolTipHover);
                }}
              >
                <span className="py-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 8.5C5.58579 8.5 5.25 8.83579 5.25 9.25C5.25 9.66421 5.58579 10 6 10C6.41421 10 6.75 9.66421 6.75 9.25C6.75 8.83579 6.41421 8.5 6 8.5ZM6 2.5C4.89543 2.5 4 3.39543 4 4.5C4 4.77614 4.22386 5 4.5 5C4.77614 5 5 4.77614 5 4.5C5 3.94772 5.44772 3.5 6 3.5C6.55228 3.5 7 3.94772 7 4.5C7 4.87058 6.91743 5.07932 6.63398 5.39755L6.51804 5.52255L6.25395 5.79209C5.71178 6.36031 5.5 6.76947 5.5 7.5C5.5 7.77614 5.72386 8 6 8C6.27614 8 6.5 7.77614 6.5 7.5C6.5 7.12942 6.58257 6.92068 6.86602 6.60245L6.98196 6.47745L7.24605 6.20791C7.78822 5.63969 8 5.23053 8 4.5C8 3.39543 7.10457 2.5 6 2.5Z"
                      fill="white"
                    />
                  </svg>
                </span>
                {toolTipHover && (
                  <span className="bg-[#1B2025] text-[#FFFFFFCC] z-50 inline-block absolute shadow-md w-[200px] md:w-[250px] text-[12px] rounded font-normal px-3 py-2 right-5 md:left-5 bottom-[-10px]">
                    You can add any number of environment variables required for
                    your container to run.
                  </span>
                )}
              </span>
            </div>

            <div className="space-y-10">
              {/* <Envs envs={envs} setEnvs={setEnvs} /> */}
              <textarea
                name="envs"
                id="envs"
                value={envsContent}
                onInput={handleEnvsInput}
                ref={envstextareaRef}
                placeholder="ENV_NAME=ENV_VALUE"
                // rows={10}
                className="overflow-hidden border border-[#ffffff80] p-2 text-[#dfdfdf] text-[14px] rounded-lg bg-transparent w-[420px] min-h-[150px] h-full max-w-[calc(100vw-50px)]"
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <span className="text-[#FFFFFF80] block font-medium font-['Poppins'] mb-3 mt-[24px] uppercase">
            Pricing Configurations
          </span>
          <div className="flex flex-col items-start xl:flex-row gap-[30px] justify-start mt-5">
            {presetsData.map((item: any) => (
              <div
                key={item._id}
                onClick={() => handlePricing(item._id)}
                className={`cursor-pointer ${
                  presetId === item._id
                    ? "border-red-500"
                    : "border-[#BBBBBB1F]"
                }`}
              >
                <PriceBox
                  name={item.name}
                  costPerHour={item.costPerHour}
                  valueProp={item.valueProp}
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

        <div className="mt-8">
          <button
            className="mb-8 bg-transparent text-[#fff] border-2 w-[117px] h-11 flex items-center justify-center gap-3.5 rounded-lg border-white text-sm font-medium hover:bg-[#08A593] hover:border-[#08A593] transition ease-in-out delay-100"
            onClick={() => handleCreateContainerCheck()}
          >
            Submit
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4367 0.145143L17.6583 5.37085L17.6876 5.39796C17.7769 5.48728 17.8249 5.60221 17.8318 5.71911V5.78089C17.8249 5.89779 17.7769 6.01272 17.6876 6.10204L17.6619 6.12399L12.4367 11.3549C12.2433 11.5484 11.9299 11.5484 11.7366 11.3549C11.5432 11.1613 11.5432 10.8476 11.7366 10.654L16.1985 6.18692L0.495063 6.18731C0.221646 6.18731 0 5.96545 0 5.69177C0 5.41808 0.221646 5.19622 0.495063 5.19622L16.0822 5.19583L11.7366 0.845954C11.5432 0.65243 11.5432 0.338667 11.7366 0.145143C11.9299 -0.0483809 12.2433 -0.0483809 12.4367 0.145143ZM17.3936 5.69135L12.0866 11.0045L17.3375 5.7501L17.3376 5.74819L17.3083 5.72129L17.2784 5.69135H17.3936Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </section>
    </Container>
  );
}

export default ServicesCreate;
