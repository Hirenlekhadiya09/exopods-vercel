import { Link } from "react-router-dom";
import CellStatus from "./CellStatus";
import IndexDropdown from "./IndexDropdown";
import CreatedTime from "pages/_components/CreatedTime";
import CellLink from "pages/_components/CellLink";

interface DomainsItemTRProps {
  containerName: string;
  containerId: string;
  records: any;
  domain: string;
  createdTime: string;
  status: boolean;
  handleDetachDomain: () => Promise<void>;
}

export default function DomainstemCard({
  containerName,
  containerId,
  records,
  domain,
  createdTime,
  status,
  handleDetachDomain,
}: DomainsItemTRProps) {
  const iTime = CreatedTime({ createdTime });
  return (
    <div className="bg-[#24292F9E] w-full rounded-lg p-[15px] flex gap-4 items-center justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link
              to="/domains/verify"
              className="text-sm font-medium text-[#fff]"
              state={{ containerId: containerId, dataForVerify: records }}
            >
              {containerName}
            </Link>
            {status ? (
              <CellStatus status="Attached" />
            ) : (
              <CellStatus status="In progress" />
            )}
            {/* // <CellStatus status={status} /> */}
            <span className="text-[#fff] text-xs font-normal block sm:hidden ml-auto">
              {iTime}
            </span>
          </div>
        </div>
        <CellLink label={domain} />
      </div>
      <div className="flex gap-11">
        <div className="flex-col gap-4 justify-between hidden sm:flex">
          <span className="text-[#fff] text-xs font-normal">{iTime}</span>
        </div>
        <IndexDropdown
          handleDetachDomain={handleDetachDomain}
          status={status}
          containerId={containerId}
          records={records}
        />
      </div>
    </div>
  );
}
