import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import GetStartedContainer from "../_sections/GetStartedContainer";

import Container from "atoms/Container";
import PageHeader from "molecules/PageHeader";
//// import Button from "atoms/Button/Button";
import Input from "atoms/Input";

// import { LocalStorageCache, useAuth0 } from "@auth0/auth0-react";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;

import { handleFilterSearch } from "./handleFilterSearch";
import ServiceItemTR from "./_components/ServiceItemTR";
import ServiceItemCard from "./_components/ServiceItemCard";
import Loader from "../../_components/Loader";
import { sortContainerData } from "./_components/sortContainerData";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
import useUserCredits from "pages/contexts/useUserCredits";
import useFetchUserProfile from "pages/hooks/useFetchUserProfile";
import useAuth from "context/AuthContext/useAuth";

interface FilterTypeItemProps {
  id: string;
  defaultChecked?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
}

function FilterTypeItem({
  id,
  defaultChecked,
  label,
  onClick,
  className,
}: FilterTypeItemProps) {
  return (
    <li>
      <input
        onClick={onClick}
        defaultChecked={defaultChecked}
        type="radio"
        id={id}
        name="hosting"
        value={id}
        className="hidden peer"
        required
      />
      <label
        htmlFor={id}
        className={`
                inline-flex items-center justify-between w-full h-10 cursor-pointer
                bg-transparent text-white ${className}
                peer-checked:bg-[#24292F] peer-checked:text-[#FEFEFF]
                `}
      >
        <div className="text-xs font-medium py-2 px-4 ">{label}</div>
      </label>
    </li>
  );
}

function ServicesIndex() {
  const [hasContainer, setHasContainer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [containerData, setContainerData] = useState<any>(null);
  const [activeContainerData, setActiveContainerData] = useState<any>(null);
  const [runningCount, setRunningCount] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  console.log("🚀 ~ runningCount:", stopCount, runningCount);
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("view-all");
  const [showSearch, setShowSearch] = useState(false);
  const { updateCredits, setIsCreditsLoading, setTxnArray } = useUserCredits();
  const { fetchUserProfile } = useFetchUserProfile();
  let supabaseAuthTokenKey: string;

  const { session } = useAuth();
  const navigate = useNavigate();

  const sbSubdomainMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
  if (sbSubdomainMatch) {
    const sbSubdomain = sbSubdomainMatch[1];
    supabaseAuthTokenKey = `sb-${sbSubdomain}-auth-token`;
  }

  useEffect(() => {
    const aToken = handleAccessToken();
    if (
      aToken !== undefined &&
      window.localStorage.getItem("access_token") !== undefined
    ) {
      fetchContainerData();
      ProfileData();
      // return;
    } else {
      const tokenInterval = window.setInterval(() => {
        const aaToken = handleAccessToken();
        if (
          aaToken !== undefined &&
          window.localStorage.getItem("access_token") !== undefined
        ) {
          ProfileData();
          fetchContainerData();
          clearInterval(tokenInterval);
        }
      }, 500);
    }
  }, []);

  function handleAccessToken() {
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      console.log(key);
      if (key && key.includes(supabaseAuthTokenKey)) {
        const item = localStorage.getItem(key);
        // @ts-ignore
        const parsedItem = JSON.parse(item);
        window.localStorage.setItem("access_token", parsedItem?.access_token);
        return parsedItem?.access_token;
      }
    }
  }

  if (!session) {
    navigate("/");
  }

  useEffect(() => {
    if (containerData) {
      handleFilterSearch({
        containerData,
        filterVal,
        searchVal,
        setActiveContainerData,
      });
    }
  }, [searchVal, filterVal]);

  useEffect(() => {
    const getQueryParams = () => {
      return new URLSearchParams(window.location.search);
    };

    const params = getQueryParams();
    const sessionId = params.get("session_id");

    if (sessionId) {
      const accessToken = window.localStorage.getItem("access_token");
      const apiUrl = `${exoApiUrl}user/txn`;

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          session_id: sessionId,
        }),
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
          // console.log(data);
          window.dataLayer.push({
            event: "revenue",
            amount: data.amount,
            currency: "USD",
            product: "exopods_plan",
            type: "Customer chooses price",
          });
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, "", newUrl);
          const credits = Number(parseFloat(data.credits).toFixed(5));
          updateCredits(credits);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  async function ProfileData() {
    // const accessToken = await getAccessTokenSilently();
    const apiUrl = `${exoApiUrl}user/profile`;
    const accessToken = window.localStorage.getItem("access_token");

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        email: session?.user?.user_metadata?.email,
        email_verified: session?.user?.user_metadata?.email_verified,
        name: session?.user?.user_metadata?.name,
        nickname: session?.user?.user_metadata?.user_name,
        picture: session?.user?.user_metadata?.avatar_url,
      }),
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
      .then(() => {
        window.dataLayer.push({
          event: "User activated",
        });
        getProfileData();
      });
    // .catch((err: any) => {
    //   // console.log(err);
    // });
  }

  async function getProfileData() {
    const accessToken = window.localStorage.getItem("access_token");
    fetch(`${exoApiUrl}user/profile`, {
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
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
        return Promise.reject(res);
      })
      .then((res) => {
        const credits = Number(parseFloat(res.data.credits).toFixed(5));
        updateCredits(credits);
        setTxnArray(res.data.txn_id);
        setIsCreditsLoading(false);
      })
      .catch((err: any) => {
        setIsCreditsLoading(false);
        console.log(err);
      });
  }

  async function fetchContainerData() {
    // const accessToken = await getAccessTokenSilently();
    const apiUrl = `${exoApiUrl}kube/list-container`;
    const accessToken = window.localStorage.getItem("access_token");

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
      .then((cData) => {
        sortContainerData(cData.data);
        setHasContainer(true);
        setContainerData(cData.data);
        setActiveContainerData(cData.data);
        setIsLoading(false);
        handleStatBox(cData.data);
      })
      // .catch((err: any) => {
      .catch(() => {
        setHasContainer(false);
        setIsLoading(false);
      });
  }

  async function handleDeleteContainer(id: string) {
    setIsLoading(true);
    // const accessToken = await getAccessTokenSilently();
    const deleteUrl = `${exoApiUrl}kube/delete-container/${id}`;
    const accessToken = window.localStorage.getItem("access_token");

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          // setIsLoading(false);
          setTimeout(() => {
            fetchUserProfile();
          }, 500);
          fetchContainerData();
        }
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Error:", err);
      });
  }

  function handleRefresh() {
    setIsLoading(true);
    fetchContainerData();
  }

  function handleStatBox(data: any) {
    const total = data.length;
    let totalRunningCount = 0;
    for (const container of data) {
      if (container.status === "Running") {
        totalRunningCount++;
      }
    }
    const totalStopCount = total - totalRunningCount;
    setRunningCount(totalRunningCount);
    setStopCount(totalStopCount);
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!hasContainer) return <GetStartedContainer />;
  return (
    <Container>
      <section className="pb-2">
        <PageHeader
          title="Services"
          className="hidden sm:flex items-center justify-between"
        >
          <div className="ml-auto">
            {/* <div className="hidden sm:flex items-center space-x-12">
              <StatBox label="Running" value={runningCount} config="up" />
              <StatBox label="Stop" value={stopCount} config="down" />
            </div> */}
            {/* <Button> */}
            <NavLink
              to="/services/new"
              className={
                " flex gap-1 items-center py-[10px] px-4 text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] hover:!bg-[#fff] ease-in-out hover:text-[#000] text-sm font-medium bg-[linear-gradient(90deg,rgba(26,115,232,0.05)0%,rgba(240,40,73,0.05)54%,rgba(133,59,206,0.05)98.5%)]"
              }
            >
              <svg
                width="12"
                height="12"
                className="w-4 h-4 fsm:w-3 fsm:h-3"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 11V1M1 6H11"
                  stroke="white"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
              <span className="hidden fsm:inline-block"> Create New </span>
            </NavLink>
            {/* </Button> */}
          </div>
        </PageHeader>
      </section>

      <section className="fixed top-16 sm:top-0 px-6 sm:px-4 py-3 left-0 sm:relative bg-[#0C1015] w-[calc(100vw-20px)] sm:w-full border border-[#BBBBBB26] rounded-xl rounded-bl-none rounded-br-none">
        <div className="flex items-center justify-end sm:justify-between">
          <PageHeader
            title="Services"
            className="mr-auto sm:hidden !mb-0"
          ></PageHeader>
          <div className="hidden sm:block">
            <ul className="flex">
              <FilterTypeItem
                defaultChecked={true}
                label="View all"
                id="view-all"
                onClick={(e: any) => setFilterVal(e.target.value)}
                className="border-t border-b border-l border-[#24292F] rounded-tl-xl rounded-bl-xl"
              />
              <FilterTypeItem
                label="Running"
                id="running"
                onClick={(e: any) => setFilterVal(e.target.value)}
                className="border border-[#24292F]"
              />
              <FilterTypeItem
                label="Stopped"
                id="stopped"
                onClick={(e: any) => setFilterVal(e.target.value)}
                className="border-t border-b border-r border-[#24292F] rounded-tr-xl rounded-br-xl"
              />
            </ul>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleRefresh()}
              className="p-3 border border-[#BBBBBB26] rounded-lg"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.6972 3.58188C16.6679 1.58813 14.2748 0 11.1819 0C4.99618 0 0 4.9225 0 11C0 17.0775 4.99618 22 11.1819 22C16.402 22 20.7545 18.4937 22 13.75H20.2297C19.0821 16.9538 14.8346 20.1575 11.1819 20.1575C6.54962 20.1575 2.17622 15.5513 2.17622 11C2.17622 6.44875 6.54962 1.82875 11.1819 1.82875C13.5051 1.82875 15.6113 3.32063 17.1228 4.81938L14.4987 7.87188L22 8.61438L21.3632 0.941877L18.6972 3.58188Z"
                  fill="#fff"
                />
              </svg>
            </button>
            <div>
              <button
                className="flex md:hidden"
                onClick={() => setShowSearch(!showSearch)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 2.00077C4.93913 2.00077 3.92172 2.42219 3.17157 3.17234C2.42143 3.92248 2 4.9399 2 6.00077C2 7.06163 2.42143 8.07905 3.17157 8.82919C3.92172 9.57934 4.93913 10.0008 6 10.0008C7.06087 10.0008 8.07828 9.57934 8.82843 8.82919C9.57857 8.07905 10 7.06163 10 6.00077C10 4.9399 9.57857 3.92248 8.82843 3.17234C8.07828 2.42219 7.06087 2.00077 6 2.00077ZM1.13461e-07 6.00077C-0.00012039 5.05647 0.222642 4.12548 0.650171 3.28351C1.0777 2.44154 1.69792 1.71236 2.4604 1.15529C3.22287 0.598219 4.10606 0.228978 5.03815 0.0775993C5.97023 -0.0737798 6.92488 -0.00302249 7.82446 0.284117C8.72404 0.571256 9.54315 1.06667 10.2152 1.73006C10.8872 2.39346 11.3931 3.2061 11.6919 4.1019C11.9906 4.9977 12.0737 5.95136 11.9343 6.88532C11.795 7.81928 11.4372 8.70716 10.89 9.47677L15.707 14.2938C15.8892 14.4824 15.99 14.735 15.9877 14.9972C15.9854 15.2594 15.8802 15.5102 15.6948 15.6956C15.5094 15.881 15.2586 15.9862 14.9964 15.9884C14.7342 15.9907 14.4816 15.8899 14.293 15.7078L9.477 10.8918C8.57936 11.53 7.52335 11.9089 6.42468 11.9869C5.326 12.0648 4.22707 11.8389 3.2483 11.3337C2.26953 10.8286 1.44869 10.0638 0.875723 9.12312C0.30276 8.18244 -0.000214051 7.1022 1.13461e-07 6.00077Z"
                    fill="#fff"
                  />
                </svg>
              </button>
              <div className="hidden md:flex">
                <Input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search container"
                  type="text"
                  className="bg-transparent py-3 px-12 pl-10 border border-[#BBBBBB1F] text-xs"
                  iconLeft={`
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.00077C4.93913 2.00077 3.92172 2.42219 3.17157 3.17234C2.42143 3.92248 2 4.9399 2 6.00077C2 7.06163 2.42143 8.07905 3.17157 8.82919C3.92172 9.57934 4.93913 10.0008 6 10.0008C7.06087 10.0008 8.07828 9.57934 8.82843 8.82919C9.57857 8.07905 10 7.06163 10 6.00077C10 4.9399 9.57857 3.92248 8.82843 3.17234C8.07828 2.42219 7.06087 2.00077 6 2.00077ZM1.13461e-07 6.00077C-0.00012039 5.05647 0.222642 4.12548 0.650171 3.28351C1.0777 2.44154 1.69792 1.71236 2.4604 1.15529C3.22287 0.598219 4.10606 0.228978 5.03815 0.0775993C5.97023 -0.0737798 6.92488 -0.00302249 7.82446 0.284117C8.72404 0.571256 9.54315 1.06667 10.2152 1.73006C10.8872 2.39346 11.3931 3.2061 11.6919 4.1019C11.9906 4.9977 12.0737 5.95136 11.9343 6.88532C11.795 7.81928 11.4372 8.70716 10.89 9.47677L15.707 14.2938C15.8892 14.4824 15.99 14.735 15.9877 14.9972C15.9854 15.2594 15.8802 15.5102 15.6948 15.6956C15.5094 15.881 15.2586 15.9862 14.9964 15.9884C14.7342 15.9907 14.4816 15.8899 14.293 15.7078L9.477 10.8918C8.57936 11.53 7.52335 11.9089 6.42468 11.9869C5.326 12.0648 4.22707 11.8389 3.2483 11.3337C2.26953 10.8286 1.44869 10.0638 0.875723 9.12312C0.30276 8.18244 -0.000214051 7.1022 1.13461e-07 6.00077Z" fill="#667085"/>
                          </svg>
                    `}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-7 mt-2 md:hidden flex justify-end">
          {showSearch && (
            <Input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search container"
              type="text"
              className="bg-transparent py-2 px-12 pl-10 h-[35px] border border-[#ffffff80] text-xs"
              iconLeft={`
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.00077C4.93913 2.00077 3.92172 2.42219 3.17157 3.17234C2.42143 3.92248 2 4.9399 2 6.00077C2 7.06163 2.42143 8.07905 3.17157 8.82919C3.92172 9.57934 4.93913 10.0008 6 10.0008C7.06087 10.0008 8.07828 9.57934 8.82843 8.82919C9.57857 8.07905 10 7.06163 10 6.00077C10 4.9399 9.57857 3.92248 8.82843 3.17234C8.07828 2.42219 7.06087 2.00077 6 2.00077ZM1.13461e-07 6.00077C-0.00012039 5.05647 0.222642 4.12548 0.650171 3.28351C1.0777 2.44154 1.69792 1.71236 2.4604 1.15529C3.22287 0.598219 4.10606 0.228978 5.03815 0.0775993C5.97023 -0.0737798 6.92488 -0.00302249 7.82446 0.284117C8.72404 0.571256 9.54315 1.06667 10.2152 1.73006C10.8872 2.39346 11.3931 3.2061 11.6919 4.1019C11.9906 4.9977 12.0737 5.95136 11.9343 6.88532C11.795 7.81928 11.4372 8.70716 10.89 9.47677L15.707 14.2938C15.8892 14.4824 15.99 14.735 15.9877 14.9972C15.9854 15.2594 15.8802 15.5102 15.6948 15.6956C15.5094 15.881 15.2586 15.9862 14.9964 15.9884C14.7342 15.9907 14.4816 15.8899 14.293 15.7078L9.477 10.8918C8.57936 11.53 7.52335 11.9089 6.42468 11.9869C5.326 12.0648 4.22707 11.8389 3.2483 11.3337C2.26953 10.8286 1.44869 10.0638 0.875723 9.12312C0.30276 8.18244 -0.000214051 7.1022 1.13461e-07 6.00077Z" fill="#667085"/>
                        </svg>
                  `}
            />
          )}
        </div>
      </section>

      <section className="">
        <div className="flow-root border border-[#BBBBBB26] border-t-0">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="hidden exobp:inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                <table className="min-w-full table-fixed">
                  <thead className=" rounded-2xl h-12">
                    <tr className="text-[#667085] text-xs font-normal border-b border-b-[#BBBBBB26]">
                      <th
                        scope="col"
                        className="px-2 min-w-[5rem] text-left pl-4 bg-[#BBBBBB0A] text-[#fff] "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#BBBBBB0A] text-[#fff]"
                      >
                        Sub Domain
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#BBBBBB0A] text-[#fff]"
                      >
                        Port(S)
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#BBBBBB0A] text-[#fff]"
                      >
                        Last Updated
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#BBBBBB0A] text-[#fff]"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#BBBBBB0A] text-[#fff] pl-3"
                      >
                        <span className="sr-only">Manage</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y-[0.5px] divide-[#ffffff25]">
                    {activeContainerData.map((item: any) => (
                      <ServiceItemTR
                        handleDeleteContainer={() =>
                          handleDeleteContainer(item.container._id)
                        }
                        containerId={item.container._id}
                        status={item.status}
                        subdomain={item.container.subdomain}
                        port={item.container.revisions[0].port}
                        containerName={item.container.container_name}
                        img={item.container.image}
                        updatedTime={item.container.updated_time}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-5 exobp:hidden px-4 sm:px-8 mt-20 sm:mt-0 pb-10">
              {activeContainerData.map((item: any) => (
                <ServiceItemCard
                  handleDeleteContainer={() =>
                    handleDeleteContainer(item.container._id)
                  }
                  containerId={item.container._id}
                  status={item.status}
                  subdomain={item.container.subdomain}
                  port={item.container.revisions[0].port}
                  containerName={item.container.container_name}
                  img={item.container.image}
                  updatedTime={item.container.updated_time}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ServicesIndex;
