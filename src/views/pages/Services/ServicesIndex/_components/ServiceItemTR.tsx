import { Link } from "react-router-dom";
import CellStatus from "./CellStatus";
// import Button from "atoms/Button/Button";

// import lastUpdated from "../../../_components/lastUpdated";
// import { configPages } from "config/configPages";
import IndexDropdown from "./IndexDropdown";
import { lastUpdated } from "pages/_components/lastUpdated";
import CellLink from "pages/_components/CellLink";
import gitHubicon from "/src/assets/icons/GitHub.svg"
interface ServiceItemTRProps {
  status: string;
  subdomain: string;
  port: number;
  containerName: string;
  img: string;
  updatedTime: string;
  containerId: string;
  handleDeleteContainer: () => Promise<void>;
}

export default function ServiceItemTR({
  status,
  subdomain,
  port,
  containerName,
  img,
  updatedTime,
  containerId,
  handleDeleteContainer,
}: ServiceItemTRProps) {
  const uTime = lastUpdated({ updatedTime });
  return (
    <tr key={containerId} className="bg-[#0C1015]">
      <td className="whitespace-nowrap pr-3 text-sm font-medium">
        <div className="flex items-center gap-3 px-2.5 xl:p-5">
          <div className="flex-shrink-0 w-10 h-10">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#E6E6E6" />
              <path
                d="M14.6132 21.7178H19.4251L16.8872 28.9699C16.555 29.8921 17.4663 30.3845 18.0454 29.6324L25.7786 19.4615C25.9234 19.2735 26 19.0944 26 18.8885C26 18.5483 25.753 18.2797 25.3953 18.2797H20.5749L23.1214 11.0275C23.445 10.1053 22.5422 9.6129 21.9631 10.3739L14.2299 20.5359C14.0851 20.7329 14 20.9119 14 21.1089C14 21.4581 14.2555 21.7178 14.6132 21.7178Z"
                fill="#FFB800"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <Link
              to={`/services/summary/${containerId}`}
              className="text-sm font-semibold text-[#fff]"
            >
              {containerName}
            </Link>
            <a className="text-[#667085] text-[10px] underline">{img}</a>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-2">
        <CellLink label={subdomain} />
      </td>
      <td className="whitespace-nowrap px-2">
        {/* <span className="text-[#175CD3] bg-[#EFF8FF] rounded-2xl px-2 py-1 text-xs inline-block space-x-0.5"> */}
        <span className="text-[#fff] text-xs inline-block space-x-0.5">
          {port}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-xs text-[#fff]">
        {uTime}
      </td>
      <td className={`whitespace-nowrap px-2 py-4`}>
        <CellStatus label={status} status={status} />
      </td>
      <td className={`whitespace-nowrap px-2 py-4`}>
        <img src={gitHubicon} alt="" />
      </td>
      <td className="whitespace-nowrap py-4 pl-3 pr-4">
        <div className="flex items-center">
          <IndexDropdown
            handleDeleteContainer={handleDeleteContainer}
            containerId={containerId}
          />
        </div>
      </td>
    </tr>
  );
}
