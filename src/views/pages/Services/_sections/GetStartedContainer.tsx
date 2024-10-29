import { Link, useNavigate } from "react-router-dom";
const githubAppLink: string = import.meta.env.VITE_EXO_GITHUB_APP_LINK;

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function GetStartedContainer() {
  const navigate = useNavigate();

  function handleGitHubAppInstallation() {
    const windowWidth = 1000;
    const windowHeight = 600;
    const windowLeft = 50;
    const windowTop = 50;
    window.open(
      `${githubAppLink}/installations/new`,
      "_blank",
      `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`
    );
  }

  return (
    <div className="mb-20">
      <div className="flex flex-col items-center px-3 mt-12">
        <h2 className="text-[#fff] text-[20px] sm:text-[24px] md:text-[28px] my-[10px] md:leading-[32px] font-bold max-w-[850px] text-center">
          Ready To Deploy Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1A73E8] from-0% via-[#AA86E3] via-100% to-[#F02849]">
            First project?
          </span>{" "}
        </h2>
        <p className="text-center max-w-[520px] text-[15px] text-[#8B949E] font-normal mt-[5px]">
          Deploy in just a few Seconds. Import a project from a Git repository
          or select a template.
        </p>
      </div>
      <div className="max-w-max m-auto mt-12 flex gap-3">
        <div className="max-w-[332px] bg-[#0F1319] py-[31px] px-[45px] flex flex-col gap-2 justify-between items-center rounded-[12px] border-[1px] border-[#BBBBBB26] overflow-hidden relative">
          <div className="absolute bottom-0 right-0 -z-1">
            <img
              src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/newDeployCardBg.png"
              alt="docker image"
            />
          </div>
          <div>
            <img
              src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/newDeployGithub.png"
              alt="docker image"
            />
          </div>
          <div>
            <h3 className="text-[24px] font-medium text-[#FAFAFA]">
              Deploy your project from Github
            </h3>
            <p className="text-[12px] fsm:text-[14px] text-[#C4C4C4A8] mt-[15px]">
              Get started quickly by selecting your public/private Github repo &
              deploy quickly with minimal configuration.
            </p>
            <ul className="text-[#C4C4C4A8] text-[12px] fsm:text-[14px] list-disc mt-[15px] pl-5">
              <li>Authenticate with Github</li>
              <li>Select public/private repo</li>
              <li>Configure params(Optional)</li>
              <li>Launch new pod.</li>
            </ul>
            <button
              onClick={() => {
                if (window.localStorage.getItem("installation_id")) {
                  navigate("/services/new/github");
                } else {
                  handleGitHubAppInstallation();
                }
              }}
              className="text-[#000] font-medium text-[12px] rounded-md px-3 py-2 mt-6 inline-block fsm:text-[14px] bg-[#FAFAFA] relative z-1"
            >
              Select Repo
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="max-w-[438px] bg-[#0F1319] flex flex-col gap-2 justify-between items-center rounded-[12px] border-[1px] border-[#BBBBBB26] overflow-hidden relative">
            <div className="absolute bottom-0 right-0 -z-1 w-[50%]">
              <img
                src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/newDeployCardBg.png"
                alt="docker image"
              />
            </div>
            <div>
              <img
                src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/newDeployTemplates.png"
                alt="docker image"
              />
            </div>
            <div className="pt-[10px] pb-[31px] px-[45px]">
              <h3 className="text-[15px] font-medium text-[#FAFAFA]">
                Deploy from 100s of One-Click templates
              </h3>
              <p className="text-[10px] fsm:text-[12px] text-[#C4C4C4A8] mt-[15px]">
                We have prepared curated templates in order to get you started
                on Exopods with just a few clicks, no configuration required.
              </p>
              <Link
                to="/services/new/templates"
                onClick={scrollToTop}
                className="text-[#fff] font-medium rounded-md border-[1px] border-[#0070F3BB] px-3 py-2 mt-6 inline-block text-[10px] fsm:text-[12px] relative z-1"
              >
                Select Template
              </Link>
            </div>
          </div>
          <div className="max-w-[438px] bg-[#0F1319] flex flex-col gap-2 justify-between items-center rounded-[12px] border-[1px] border-[#BBBBBB26] overflow-hidden relative">
            <div className="absolute bottom-0 right-0 -z-1 w-[50%]">
              <img
                src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/newDeployCardBg.png"
                alt="docker image"
              />
            </div>
            <div>
              <img
                src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/newDeployDockerImg.png"
                alt="docker image"
              />
            </div>
            <div className="pt-[10px] pb-[31px] px-[45px]">
              <h3 className="text-[15px] font-medium text-[#FAFAFA]">
                Already have your docker image?
              </h3>
              <p className="text-[10px] fsm:text-[12px] text-[#C4C4C4A8] mt-[15px]">
                Import your existing docker image from Dockerhub & Let Exopods
                handle the rest.
              </p>
              <Link
                to="/service/new/docker-images"
                onClick={scrollToTop}
                className="text-[#fff] font-medium rounded-md border-[1px] border-[#19FB9BBB] px-3 py-2 mt-6 inline-block text-[10px] fsm:text-[12px] relative z-1"
              >
                Deploy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStartedContainer;
