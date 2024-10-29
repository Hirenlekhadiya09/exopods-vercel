// import { Link } from "react-router-dom";
// import { configPages } from "config/configPages";

import {
  DropdownItem,
  DropdownMenuWrap,
  DropdownRoot,
  DropdownTrigger,
} from "molecules/Dropdown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IndexDropdownProps {
  handleDetachDomain: () => Promise<void>;
  status: boolean;
  containerId: string;
  records: any;
}

export default function IndexDropdown({
  handleDetachDomain,
  status,
  containerId,
  records,
}: IndexDropdownProps) {
  const navigate = useNavigate();
  const [showDetachCard, setShowDetachCard] = useState(false);

  return (
    <>
      {showDetachCard && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000]">
          <div className="max-w-[300px] shadow-medium bg-[#1B1F24] rounded-[12px] px-10 py-5">
            <div className="text-[#fff] text-[15px] font-medium">
              Detach Domain?
            </div>
            <p className="text-[13px] text-[#ffffff80] font-normal whitespace-normal mt-1">
              Are you sure you want to detach this Domain?
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="w-[100px] text-sm py-2 rounded-lg text-[#fff] font-medium border border-[#D0D5DD]"
                onClick={() => {
                  setShowDetachCard(false);
                }}
              >
                Cancel
              </button>
              <button
                className="w-[100px] text-sm py-[9px] rounded-lg text-[#fff] font-medium bg-[#08A593]"
                onClick={() => {
                  setShowDetachCard(false);
                  handleDetachDomain();
                }}
              >
                Detach
              </button>
            </div>
          </div>
        </div>
      )}
      <DropdownRoot>
        <DropdownTrigger>
          <svg
            className="h-8 px-0 sm:px-4 py-2 text-[#665C5C] fill-[#665C5C]"
            viewBox="0 0 128 512"
          >
            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
          </svg>
        </DropdownTrigger>

        <DropdownMenuWrap className="py-2 w-36">
          {/* <DropdownItem>
          <Link
            to={`${configPages.DOMAINS.path}`}
            className="h-full w-full px-4 py-3 hover:bg-[#ffffff10] cursor-default"
          >
            <div className="flex items-center text-xs">
              <div className="pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                >
                  <path
                    d="M7.5 0C12.1875 0 15 5.5 15 5.5C15 5.5 12.1875 11 7.5 11C2.8125 11 0 5.5 0 5.5C0 5.5 2.8125 0 7.5 0ZM7.5 1C4.2 1 1.87312 4.251 1.10156 5.5C1.87219 6.748 4.19906 10 7.5 10C10.8 10 13.1269 6.749 13.8984 5.5C13.1278 4.252 10.8009 1 7.5 1ZM7.5 2C8.37024 2 9.20484 2.36875 9.82019 3.02513C10.4355 3.6815 10.7812 4.57174 10.7812 5.5C10.7812 6.42826 10.4355 7.3185 9.82019 7.97487C9.20484 8.63125 8.37024 9 7.5 9C6.62976 9 5.79516 8.63125 5.17981 7.97487C4.56445 7.3185 4.21875 6.42826 4.21875 5.5C4.21875 4.57174 4.56445 3.6815 5.17981 3.02513C5.79516 2.36875 6.62976 2 7.5 2ZM7.5 3C6.87863 3.00079 6.28292 3.26444 5.84354 3.73311C5.40416 4.20178 5.15699 4.8372 5.15625 5.5C5.15625 6.878 6.20719 8 7.5 8C8.79281 8 9.84375 6.878 9.84375 5.5C9.84375 4.122 8.79281 3 7.5 3Z"
                    fill="#C2C2C2"
                  />
                </svg>
              </div>
              <span>View Details</span>
            </div>
          </Link>
        </DropdownItem> */}

          {!status && (
            <DropdownItem>
              <div className="h-full w-full hover:bg-[#ffffff10] cursor-default">
                <div
                  className="flex items-center text-xs px-4 py-3"
                  onClick={() => {
                    navigate("/domains/verify", {
                      state: {
                        containerId: containerId,
                        dataForVerify: records,
                      },
                    });
                  }}
                >
                  <div className="pr-3">
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.75 1.24988L4.75 10.2499L0.625 6.12488L1.6825 5.06738L4.75 8.12738L12.6925 0.192383L13.75 1.24988Z"
                        fill="#C2C2C2"
                      />
                    </svg>
                  </div>
                  <span>Verify</span>
                </div>
              </div>
            </DropdownItem>
          )}
          <DropdownItem>
            <div className="h-full w-full hover:bg-[#ffffff10] cursor-default">
              <div
                className="flex items-center text-xs px-4 py-3"
                // onClick={() => handleDetachDomain()}
                onClick={() => setShowDetachCard(true)}
              >
                <div className="pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_350_822)">
                      <path
                        d="M14.0625 2.34375H9.79687C9.68929 1.81393 9.40185 1.33759 8.98325 0.995448C8.56465 0.653306 8.04064 0.4664 7.5 0.4664C6.95936 0.4664 6.43535 0.653306 6.01675 0.995448C5.59815 1.33759 5.31071 1.81393 5.20313 2.34375H0.9375C0.81318 2.34375 0.693951 2.39314 0.606044 2.48104C0.518136 2.56895 0.46875 2.68818 0.46875 2.8125C0.46875 2.93682 0.518136 3.05605 0.606044 3.14396C0.693951 3.23186 0.81318 3.28125 0.9375 3.28125H14.0625C14.1868 3.28125 14.306 3.23186 14.394 3.14396C14.4819 3.05605 14.5312 2.93682 14.5312 2.8125C14.5312 2.68818 14.4819 2.56895 14.394 2.48104C14.306 2.39314 14.1868 2.34375 14.0625 2.34375ZM7.5 1.40625C7.79013 1.40707 8.07291 1.4976 8.30956 1.66544C8.54622 1.83328 8.72517 2.07021 8.82187 2.34375H6.17813C6.27483 2.07021 6.45378 1.83328 6.69044 1.66544C6.92709 1.4976 7.20987 1.40707 7.5 1.40625ZM12.3656 4.25625C12.2803 4.22035 12.1862 4.21055 12.0952 4.22806C12.0043 4.24558 11.9206 4.28964 11.8547 4.35469C11.8112 4.39849 11.7769 4.45043 11.7535 4.50754C11.7302 4.56465 11.7184 4.62581 11.7188 4.6875C11.7188 4.81182 11.7681 4.93105 11.856 5.01896C11.944 5.10686 12.0632 5.15625 12.1875 5.15625C12.3118 5.15625 12.431 5.10686 12.519 5.01896C12.6069 4.93105 12.6562 4.81182 12.6562 4.6875C12.6545 4.56339 12.606 4.44452 12.5203 4.35469C12.4757 4.31201 12.4232 4.27856 12.3656 4.25625ZM12.1875 6.09375C12.0632 6.09375 11.944 6.14314 11.856 6.23104C11.7681 6.31895 11.7188 6.43818 11.7188 6.5625V7.96875C11.7188 8.09307 11.7681 8.2123 11.856 8.30021C11.944 8.38811 12.0632 8.4375 12.1875 8.4375C12.3118 8.4375 12.431 8.38811 12.519 8.30021C12.6069 8.2123 12.6562 8.09307 12.6562 7.96875V6.5625C12.6562 6.43818 12.6069 6.31895 12.519 6.23104C12.431 6.14314 12.3118 6.09375 12.1875 6.09375ZM12.1875 9.375C12.0632 9.375 11.944 9.42439 11.856 9.51229C11.7681 9.6002 11.7188 9.71943 11.7188 9.84375V13.125C11.7188 13.2493 11.6694 13.3685 11.5815 13.4565C11.4935 13.5444 11.3743 13.5937 11.25 13.5937H3.75C3.62568 13.5937 3.50645 13.5444 3.41854 13.4565C3.33064 13.3685 3.28125 13.2493 3.28125 13.125V4.6875C3.28125 4.56318 3.23186 4.44395 3.14396 4.35604C3.05605 4.26814 2.93682 4.21875 2.8125 4.21875C2.68818 4.21875 2.56895 4.26814 2.48104 4.35604C2.39314 4.44395 2.34375 4.56318 2.34375 4.6875V13.125C2.34375 13.498 2.49191 13.8556 2.75563 14.1194C3.01935 14.3831 3.37704 14.5312 3.75 14.5312H11.25C11.623 14.5312 11.9806 14.3831 12.2444 14.1194C12.5081 13.8556 12.6562 13.498 12.6562 13.125V9.84375C12.6562 9.71943 12.6069 9.6002 12.519 9.51229C12.431 9.42439 12.3118 9.375 12.1875 9.375Z"
                        fill="#C2C2C2"
                      />
                      <path
                        d="M5.625 11.25V5.15625C5.625 5.03193 5.57561 4.9127 5.48771 4.82479C5.3998 4.73689 5.28057 4.6875 5.15625 4.6875C5.03193 4.6875 4.9127 4.73689 4.82479 4.82479C4.73689 4.9127 4.6875 5.03193 4.6875 5.15625V11.25C4.6875 11.3743 4.73689 11.4935 4.82479 11.5815C4.9127 11.6694 5.03193 11.7188 5.15625 11.7188C5.28057 11.7188 5.3998 11.6694 5.48771 11.5815C5.57561 11.4935 5.625 11.3743 5.625 11.25ZM7.96875 11.25V5.15625C7.96875 5.03193 7.91936 4.9127 7.83146 4.82479C7.74355 4.73689 7.62432 4.6875 7.5 4.6875C7.37568 4.6875 7.25645 4.73689 7.16854 4.82479C7.08064 4.9127 7.03125 5.03193 7.03125 5.15625V11.25C7.03125 11.3743 7.08064 11.4935 7.16854 11.5815C7.25645 11.6694 7.37568 11.7188 7.5 11.7188C7.62432 11.7188 7.74355 11.6694 7.83146 11.5815C7.91936 11.4935 7.96875 11.3743 7.96875 11.25ZM10.3125 11.25V5.15625C10.3125 5.03193 10.2631 4.9127 10.1752 4.82479C10.0873 4.73689 9.96807 4.6875 9.84375 4.6875C9.71943 4.6875 9.6002 4.73689 9.51229 4.82479C9.42439 4.9127 9.375 5.03193 9.375 5.15625V11.25C9.375 11.3743 9.42439 11.4935 9.51229 11.5815C9.6002 11.6694 9.71943 11.7188 9.84375 11.7188C9.96807 11.7188 10.0873 11.6694 10.1752 11.5815C10.2631 11.4935 10.3125 11.3743 10.3125 11.25Z"
                        fill="#C2C2C2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_350_822">
                        <rect width="15" height="15" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span>Detach</span>
              </div>
            </div>
          </DropdownItem>
        </DropdownMenuWrap>
      </DropdownRoot>
    </>
  );
}
