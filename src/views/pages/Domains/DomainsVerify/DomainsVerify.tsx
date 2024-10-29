import Container from "atoms/Container";
import PageHeader from "molecules/PageHeader";
import RecordItemTR from "./_components/RecordItemTR";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import RecordItemCard from "./_components/RecordItemCard";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

interface DomainVerifyItemProps {
  key: string;
  value: string;
  type: string;
}

function DomainsVerify() {
  const {
    state: { containerId, dataForVerify },
  } = useLocation();
  // const [verifyLoading, setVerifyLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("access_token");

  // function handleVerifyStatusCertificate() {
  //   verifyYourCustomDomain();
  //   verifyStatus();
  //   verifyCertificate();
  // }

  async function verifyYourCustomDomain() {
    setProgressMessage("Verifying dns records");
    setSuccessMessage("");
    setErrorMessage("");
    // setVerifyLoading(true);
    const apiUrl = `${exoApiUrl}domain/verify/${containerId}`;

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
      .then((data) => {
        if (
          data.data.success === false &&
          data.data.error.type === "certificate_not_ready_to_validate"
        ) {
          setErrorMessage("");
          verifyStatus();
        } else if (data.data.success === false) {
          setErrorMessage(`${data.data.error.type}. Try Again!`);
          setProgressMessage("");
          // setVerifyLoading(false);
          return;
        } else if (data.data.status === "pending_validation") {
          setErrorMessage("");
          verifyStatus();
        }
      })
      .catch((err: any) => {
        // setVerifyLoading(false);
        setProgressMessage("");
        console.log(err);
      });
  }

  async function verifyStatus() {
    setProgressMessage("Verifying status");
    const apiUrl = `${exoApiUrl}domain/status/${containerId}`;

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
      .then((data) => {
        if (data.data.success === false) {
          setErrorMessage(`${data.data.error.type}. Try Again!`);
          setProgressMessage("");
          // setVerifyLoading(false);
          return;
        } else {
          setErrorMessage("");
          setProgressMessage("Obtaining SSL certificate");
          setTimeout(() => {
            verifyCertificate();
          }, 3000);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async function verifyCertificate() {
    const apiUrl = `${exoApiUrl}domain/certificate/${containerId}`;

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
      .then((data) => {
        if (data.success === true) {
          // setSuccessMessage(data.msg);
          // setVerifyLoading(false);
          setProgressMessage("");
          setSuccessMessage("Verification complete. You're all set!");
          setDone(true);
          setErrorMessage("");
          // setDone(true)
          // navigate("/domains");
        } else {
          setErrorMessage(`${data.message}. Try Again!`);
          setProgressMessage("");
          // setVerifyLoading(false);
        }
      })
      .catch((err: any) => {
        // setVerifyLoading(false);
        setProgressMessage("");
        console.log(err);
      });
  }

  return (
    <Container className="mt-16 sm:mt-0">
      <section>
        <div className="max-w-[480px]">
          <PageHeader title="Verify your custom domain">
            <p className="mt-2 text-sm text-[#ffffff99] font-normal">
              Verification process can take upto 30 minutes.
            </p>
          </PageHeader>
        </div>
      </section>

      <section>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="hidden exobp:inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative ring-b ring-red-700 ring-offset-1 ring-offset-red-700 rounded-2xl overflow-hidden bg-[#24292F]">
                <table className="min-w-full table-fixed">
                  <thead className=" rounded-2xl h-12 border-b border-[#24292F]">
                    <tr className="text-[#667085] text-xs font-normal">
                      <th
                        scope="col"
                        className="px-2 text-left pl-4 bg-[#24292F] text-[#fff] rounded-tl-2xl"
                      >
                        Key
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#24292F] text-[#fff]"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left pl-3 bg-[#24292F] text-[#fff] rounded-tr-2xl"
                      >
                        Type
                      </th>
                    </tr>
                  </thead>

                  <tbody className="not-last:divide-y-0 divide-y-[0.5px] divide-[#ffffff40] bg-white border-[#ffffff40] border-[0.5px]">
                    {dataForVerify.map((item: DomainVerifyItemProps) => (
                      <RecordItemTR
                        dKey={item.key}
                        value={item.value}
                        type={item.type}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-5 exobp:hidden px-4 sm:px-8 mt-5">
              {dataForVerify.map((item: DomainVerifyItemProps) => (
                <RecordItemCard
                  dKey={item.key}
                  value={item.value}
                  type={item.type}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-[#ffffff99] font-normal mt-12 max-w-[420px]">
          Please copy and add the provided records to your domain. Activation of
          these records on your domain may take some time. We kindly request you
          to verify the changes once you have added them.
        </p>

        <div className="mb-8 mt-12 flex gap-5 items-center">
          <button
            className="bg-[#08A593] text-[#fff] border-2 w-[117px] h-11 rounded-lg border-[#08A593] text-sm font-medium flex items-center justify-center gap-2"
            // onClick={() => verifyYourCustomDomain()}
            onClick={() => {
              if (done) {
                navigate("/domains");
              } else {
                verifyYourCustomDomain();
              }
            }}
            // onClick={() => handleVerifyStatusCertificate()}
          >
            {/* {verifyLoading && (
              <div className="animate-spin">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2301_7027)">
                    <path
                      opacity="0.2"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5ZM0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.25 0.75C7.25 0.551088 7.32902 0.360322 7.46967 0.21967C7.61032 0.0790176 7.80109 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 8.19891 15.921 8.38968 15.7803 8.53033C15.6397 8.67098 15.4489 8.75 15.25 8.75C15.0511 8.75 14.8603 8.67098 14.7197 8.53033C14.579 8.38968 14.5 8.19891 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C7.80109 1.5 7.61032 1.42098 7.46967 1.28033C7.32902 1.13968 7.25 0.948912 7.25 0.75Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2301_7027">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )} */}
            {/* <span>Verify</span> */}
            {done ? <span>Done</span> : <span>Verify</span>}
          </button>
          {progressMessage !== "" && (
            <div className="flex gap-2 items-center">
              <div className="w-[25px] h-[25px] overflow-hidden">
                <div className="animate-spin">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3507_2471)">
                      <path
                        opacity="0.2"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.5 2.34375C9.80639 2.34375 7.22311 3.41378 5.31845 5.31845C3.41378 7.22311 2.34375 9.80639 2.34375 12.5C2.34375 15.1936 3.41378 17.7769 5.31845 19.6816C7.22311 21.5862 9.80639 22.6562 12.5 22.6562C15.1936 22.6562 17.7769 21.5862 19.6816 19.6816C21.5862 17.7769 22.6562 15.1936 22.6562 12.5C22.6562 9.80639 21.5862 7.22311 19.6816 5.31845C17.7769 3.41378 15.1936 2.34375 12.5 2.34375ZM0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25C9.18479 25 6.00537 23.683 3.66117 21.3388C1.31696 18.9946 0 15.8152 0 12.5Z"
                        fill="#08A593"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.3281 1.17188C11.3281 0.861074 11.4516 0.563003 11.6714 0.343234C11.8911 0.123465 12.1892 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 12.8108 24.8765 13.1089 24.6568 13.3286C24.437 13.5484 24.1389 13.6719 23.8281 13.6719C23.5173 13.6719 23.2193 13.5484 22.9995 13.3286C22.7797 13.1089 22.6562 12.8108 22.6562 12.5C22.6562 9.80639 21.5862 7.22311 19.6816 5.31845C17.7769 3.41378 15.1936 2.34375 12.5 2.34375C12.1892 2.34375 11.8911 2.22028 11.6714 2.00052C11.4516 1.78075 11.3281 1.48268 11.3281 1.17188Z"
                        fill="#08A593"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3507_2471">
                        <rect width="25" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="text-[#fff] text-xs">{progressMessage}</span>
            </div>
          )}
          {successMessage !== "" && (
            <div className="flex gap-2 items-center">
              {/* <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.75 1.24988L4.75 10.2499L0.625 6.12488L1.6825 5.06738L4.75 8.12738L12.6925 0.192383L13.75 1.24988Z"
                  fill="#08A593"
                />
              </svg> */}
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3507_2489)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.5 23C6.41764 23 2 18.6675 2 12.5852C2 6.5028 6.41764 2 12.5 2C18.5824 2 23 6.5028 23 12.5852C23 18.6675 18.5824 23 12.5 23ZM12.5 0C5.60736 0 0 5.60736 0 12.5C0 19.3926 5.60736 25 12.5 25C19.3926 25 25 19.3926 25 12.5C25 5.60736 19.3926 0 12.5 0ZM11.1243 15.0778L7.59191 11.5454L6.5522 12.5852L11.1243 17.1572L18.9375 9.34397L18.4176 8.82411L17.8978 8.30426L11.1243 15.0778Z"
                    fill="#08A593"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3507_2489">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[#08A593] text-xs">{successMessage}</span>
            </div>
          )}
          {errorMessage !== "" && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
      </section>
    </Container>
  );
}

export default DomainsVerify;
