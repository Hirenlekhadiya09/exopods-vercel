import dockerIcon from "/src/assets/icons/docker.svg";
import githubIcon from "/src/assets/icons/GitHub.svg";
import shareIcon from "/src/assets/icons/share.svg"
interface ContainerData {
  image: string;
  container_name?: string;
  subdomain?: string;
  updated_time?: string;
  creditsApplied?: number;
  valid_name: string;
  provider?: "github" | "docker";
}

interface SummaryData {
  container?: ContainerData;
  status?: string;
}

interface ActiveRevision {
  image_tag?: string;
  port?: string;
  command?: string;
  args?: string;
  env?: { name: string; value: string }[];
}

interface MachineTierData {
  name: string;
}
interface SummaryDockerDeploymentProps {
  summaryData: SummaryData;
  machineTierData: MachineTierData;
  activeRevision?: ActiveRevision;
}

const SummaryDockerDeployment = ({
  summaryData,
  machineTierData,
  activeRevision,
}: SummaryDockerDeploymentProps) => {
  const container = summaryData?.container;

  const getProviderImage = () => {
    switch (container?.provider) {
      case "github":
        return githubIcon;
      case "docker":
      default:
        return dockerIcon;
    }
  };

  const getProviderText = () => {
    switch (container?.provider) {
      case "github":
        return "GitHub";
      case "docker":
      default:
        return "Docker";
    }
  };

  const formatTimeDifference = (updatedTime: string): string => {
    const updatedDate = new Date(updatedTime);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - updatedDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    let preciseTime;
    if (diffInSeconds < 60) {
      preciseTime = `${diffInSeconds}s`;
    } else if (diffInMinutes < 60) {
      preciseTime = `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      preciseTime = `${diffInHours}h`;
    } else {
      preciseTime = `${diffInDays}d`;
    }
    const daysAgo = diffInDays > 0 ? `(${diffInDays}d ago)` : "";

    return `${preciseTime} ${daysAgo}`;
  };

  return (
    <div>
      <div className="border border-[#BBBBBB26] rounded-lg py-3 px-4 pr-[58px] rounded-bl-none rounded-br-none">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <div className="border border-[#19FB9B99] py-3 px-[17px] rounded-md bg-[#19FB9B1A]">
              <img src={getProviderImage()} alt="" />

              {/* <img src="/src/assets/icons/docker.svg" alt="" /> */}
            </div>
            <div>
              <p className="text-[22px] font-medium text-[#FFFFFF]">
                {summaryData?.container?.container_name}
              </p>
              <a
                href=""
                className="text-[#C4C4C4A8] text-xs font-normal underline underline-offset-2"
              >
                {summaryData?.container?.image}:{activeRevision?.image_tag}
              </a>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="">
              <p className="text-[#A1A1A1] text-sm font-normal">
                Internal Endpoint
              </p>
              <div className="py-1 px-[7px] flex gap-[4px] items-center rounded-full bg-[#10233D] mt-2">
                <p className="text-[#005BF8] text-[13px] font-normal">
                  {summaryData?.container?.valid_name}
                </p>
              </div>
            </div>
            <div className="">
              <p className="text-[#A1A1A1] text-sm font-normal">
                Public Endpoint
              </p>
              <div className="py-1 px-[7px] flex gap-[4px] items-center rounded-full bg-[#10233D] mt-2">
                <p className="text-[#005BF8] text-[13px] font-normal">
                  {container?.subdomain}
                </p>
                <div>
                  <img src={shareIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-[#BBBBBB26] rounded-lg py-3 px-4 rounded-tl-none rounded-tr-none border-t-0">
        <div className="flex">
          <div className="min-w-[120px]">
            <p className="text-[#C4C4C4A8] text-sm font-normal">Status</p>
            <div className="flex gap-[5px] items-center mt-2">
              <div
                className={`w-[10px] h-[10px] rounded-full ${
                  summaryData?.status === "Running"
                    ? "bg-[#56D364]"
                    : summaryData?.status === "Pending"
                    ? "bg-[#FFA500]"
                    : summaryData?.status === "Termination"
                    ? "bg-[#FF0000]"
                    : ""
                }`}
              ></div>
              <p className="text-[#EDEDED] text-sm font-medium">
                {summaryData?.status}
              </p>
            </div>
          </div>

          <div className="min-w-[120px]">
            <p className="text-[#C4C4C4A8] text-sm font-normal">Port(S)</p>
            <div className="mt-2">
              <p className="text-[#1A73E8] text-sm font-medium">
                {activeRevision?.port}
              </p>
            </div>
          </div>
          <div className="min-w-[120px]">
            <p className="text-[#C4C4C4A8] text-sm font-normal">Last Updated</p>
            <div className="mt-2">
              <p className="text-[#EDEDED] text-sm font-medium">
                {container?.updated_time
                  ? formatTimeDifference(container.updated_time)
                  : ""}
              </p>
            </div>
          </div>
          <div className="min-w-[120px]">
            <p className="text-[#C4C4C4A8] text-sm font-normal">Provider</p>
            <div className="mt-2">
              <p className="text-[#EDEDED] text-sm font-medium">
                {getProviderText()}
              </p>
            </div>
          </div>
          <div className="min-w-[120px]">
            <p className="text-[#C4C4C4A8] text-sm font-normal">Machine Tier</p>
            <div className="mt-2">
              <p className="text-[#FC9C66] text-sm font-medium">
                {machineTierData?.name}
              </p>
            </div>
          </div>
          <div className="min-w-[120px]">
            <p className="text-[#C4C4C4A8] text-sm font-normal">
              Credits Consumed
            </p>
            <div className="mt-2">
              <p className="text-[#56D364] text-sm font-medium">
                $ {container?.creditsApplied?.toFixed(5)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDockerDeployment;
