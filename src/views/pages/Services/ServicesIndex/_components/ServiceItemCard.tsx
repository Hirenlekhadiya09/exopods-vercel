import { Link } from "react-router-dom";
import CellStatus from "./CellStatus";
// import Button from "atoms/Button/Button";

// import LastUpdated from "../../../_components/lastUpdated";
import { configPages } from "config/configPages";
import IndexDropdown from "./IndexDropdown";
import { lastUpdated } from "pages/_components/lastUpdated";
import CellLink from "pages/_components/CellLink";

interface ServiceItemCardProps {
  status: string;
  subdomain: string;
  port: number;
  containerName: string;
  img: string;
  updatedTime: string;
  containerId: string;
  handleDeleteContainer: () => Promise<void>;
}

export default function ServiceItemCard({
  status,
  subdomain,
  port,
  containerName,
  img,
  updatedTime,
  containerId,
  handleDeleteContainer,
}: ServiceItemCardProps) {
  const uTime = lastUpdated({ updatedTime });
  return (
    <div
      key={containerId}
      className="bg-[#24292F9E] w-full rounded-lg p-[15px] flex gap-4 items-center justify-between"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link
              to={`${configPages.SERVICES.path}/${containerId}`}
              className="text-sm font-medium text-[#fff]"
            >
              {containerName}
            </Link>
            <CellStatus status={status} />
            <span className="text-[#fff] text-xs font-normal block sm:hidden ml-auto">
              {uTime}
            </span>
          </div>

          <a className="text-[#667085] text-xs underline">{img}</a>
        </div>
        <CellLink label={subdomain} />
      </div>
      <div className="flex gap-11">
        <div className="flex-col gap-4 justify-between hidden sm:flex">
          <span className="text-[#fff] text-xs font-normal">{uTime}</span>
          <span className="text-[#fff] text-xs font-normal">{port}</span>
        </div>
        <IndexDropdown
          handleDeleteContainer={handleDeleteContainer}
          containerId={containerId}
        />
      </div>
    </div>
  );
}
