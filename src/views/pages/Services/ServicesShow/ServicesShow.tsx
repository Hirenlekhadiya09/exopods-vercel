import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { configPages } from "config/configPages";

import Container from "atoms/Container";
// import Input from "atoms/Input";
import { useEffect, useState } from "react";
import CreatedTime from "pages/_components/CreatedTime";
// import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../.././_components/Loader";
import CellLink from "pages/_components/CellLink";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
import useFetchUserProfile from "pages/hooks/useFetchUserProfile";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

interface ServiceNavItemProps {
  id: string;
  name: string;
  url: string;
}

function ServiceNavItem({ id, name, url }: ServiceNavItemProps) {
  return (
    <NavLink
      to={`${configPages.SERVICES.path}/${id}${url}`}
      className={({ isActive }) =>
        `text-[#fff] text-xs px-1 pb-[9.5px] sm:pb-3.5 whitespace-nowrap border-b-2 border-[#fff] ${
          isActive
            ? "text-[#252C32] border-[#000] font-semibold active-class"
            : "font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`
      }
    >
      {name}
    </NavLink>
  );
}

function ServicesShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [containerName, setContainerName] = useState("");
  const [containerImage, setContainerImage] = useState("");
  const [containerSubDomain, setContainerSubDomain] = useState("");
  const [containerCreatedTime, setContainerCreatedTime] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { fetchUserProfile } = useFetchUserProfile();
  // const { getAccessTokenSilently } = useAuth0();

  // function toggleSearchInput() {
  //   setIsSearch(!isSearch);
  // }

  useEffect(() => {
    getASinglePod(id as string);
  }, []);

  // const accessToken = localStorage.getItem('access_token');

  async function getASinglePod(id: string) {
    // const accessToken = await getAccessTokenSilently();
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}kube/list-container/${id}`;

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
        setIsLoading(false);
        setContainerName(cData.data[0].container.container_name);
        setContainerImage(cData.data[0].container.image);
        setContainerSubDomain(cData.data[0].container.subdomain);
        setContainerCreatedTime(cData.data[0].container.created_time);
      })
      // .catch((err: any) => {
      .catch(() => {
        setIsLoading(false);
        // console.log(err);
      });
  }

  function handleRefresh() {
    setRefreshFlag(!refreshFlag);
  }

  async function handleDeleteContainer(id: string) {
    setIsLoading(true);
    // const accessToken = await getAccessTokenSilently();
    const accessToken = window.localStorage.getItem("access_token");
    const deleteUrl = `${exoApiUrl}kube/delete-container/${id}`;

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          setTimeout(() => {
            fetchUserProfile();
          }, 500);
          setIsLoading(false);
          navigate("/services");
        }
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
      })
      // .catch((err) => {
      .catch(() => {
        setIsLoading(false);
        // console.log("Error:", err);
      });
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container className="mt-16 sm:mt-0">
      {/* <PageHeader title={`Site ${id}`} className="capitalize" /> */}

      <section className="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center mb-8">
        <div className="flex items-center sm:space-x-2">
          <div className="w-10 h-10 hidden sm:flex">
            <img
              className="h-full w-full"
              src="https://i.postimg.cc/g0LrxxFR/Avatar.png"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-medium capitalize text-2xl text-[#fff]">
                {containerName}
              </h1>
              <div className="h-2 w-2 bg-[#5ED77E] rounded-full"></div>
            </div>

            <div className="flex space-x-6">
              <div className="flex items-center space-x-2 text-[#48535B]">
                <span className="text-xs text-[#FFFFFFB2]">
                  {containerImage}
                </span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M4.91634 3.3335V2.54183C4.91634 1.79544 4.91634 1.42225 5.14822 1.19037C5.3801 0.958496 5.75329 0.958496 6.49967 0.958496H10.458C11.2044 0.958496 11.5776 0.958496 11.8095 1.19037C12.0413 1.42225 12.0413 1.79544 12.0413 2.54183V6.50016C12.0413 7.24655 12.0413 7.61974 11.8095 7.85162C11.5776 8.0835 11.2044 8.0835 10.458 8.0835H9.66634M2.54134 12.0418H6.49967C7.24606 12.0418 7.61925 12.0418 7.85113 11.8099C8.08301 11.5781 8.08301 11.2049 8.08301 10.4585V6.50016C8.08301 5.75378 8.08301 5.38059 7.85113 5.14871C7.61925 4.91683 7.24606 4.91683 6.49967 4.91683H2.54134C1.79495 4.91683 1.42176 4.91683 1.18988 5.14871C0.958008 5.38059 0.958008 5.75378 0.958008 6.50016V10.4585C0.958008 11.2049 0.958008 11.5781 1.18988 11.8099C1.42176 12.0418 1.79495 12.0418 2.54134 12.0418Z"
                    stroke="black"
                    stroke-opacity="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="hidden sm:flex">
                {/* <p className="text-xs">Created : 14 days ago</p> */}
                <CreatedTime createdTime={containerCreatedTime} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-10">
          <CellLink label={containerSubDomain} />

          <div className="space-x-4">
            {/* <button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clip-path="url(#clip0_478_330)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 3.04V12.56C14 13.6867 13.2325 14.6 12.2857 14.6H11.7143C10.7675 14.6 10 13.6867 10 12.56V3.04C10 1.91334 10.7675 1 11.7143 1H12.2857C13.2325 1 14 1.91334 14 3.04Z" fill="#F02849"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.28571 1C6.23249 1 7 1.91334 7 3.04V12.56C7 13.6867 6.23249 14.6 5.28571 14.6H4.71429C3.76751 14.6 3 13.6867 3 12.56V3.04C3 1.91334 3.76751 1 4.71429 1H5.28571Z" fill="#F02849"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_478_330">
                                <rect width="15.2" height="15.2" fill="white" transform="translate(0.400391 0.600006)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <span className="sr-only">Pause Container</span>
                        </button>
                        <button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.0752 14.6251C11.6651 14.6251 14.5752 11.715 14.5752 8.12508C14.5752 4.53528 11.6651 1.62509 8.0752 1.62509C4.48535 1.62509 1.5752 4.53528 1.5752 8.12508C1.5752 10.167 2.51673 11.989 3.98935 13.1806" stroke="#24A0ED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="sr-only">Restart Container</span>
                        </button> */}
            <button onClick={() => handleDeleteContainer(id as string)}>
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                <g clip-path="url(#clip0_478_187)">
                  <path
                    d="M14.7627 2.34375H10.4971C10.3895 1.81393 10.102 1.33759 9.68344 0.995448C9.26484 0.653306 8.74083 0.4664 8.2002 0.4664C7.65956 0.4664 7.13555 0.653306 6.71695 0.995448C6.29835 1.33759 6.01091 1.81393 5.90332 2.34375H1.6377C1.51338 2.34375 1.39415 2.39314 1.30624 2.48104C1.21833 2.56895 1.16895 2.68818 1.16895 2.8125C1.16895 2.93682 1.21833 3.05605 1.30624 3.14396C1.39415 3.23186 1.51338 3.28125 1.6377 3.28125H14.7627C14.887 3.28125 15.0062 3.23186 15.0942 3.14396C15.1821 3.05605 15.2314 2.93682 15.2314 2.8125C15.2314 2.68818 15.1821 2.56895 15.0942 2.48104C15.0062 2.39314 14.887 2.34375 14.7627 2.34375ZM8.2002 1.40625C8.49033 1.40707 8.7731 1.4976 9.00976 1.66544C9.24641 1.83328 9.42536 2.07021 9.52207 2.34375H6.87832C6.97503 2.07021 7.15398 1.83328 7.39063 1.66544C7.62729 1.4976 7.91007 1.40707 8.2002 1.40625ZM13.0658 4.25625C12.9805 4.22035 12.8864 4.21055 12.7954 4.22806C12.7045 4.24558 12.6208 4.28964 12.5549 4.35469C12.5114 4.39849 12.4771 4.45043 12.4537 4.50754C12.4304 4.56465 12.4186 4.62581 12.4189 4.6875C12.4189 4.81182 12.4683 4.93105 12.5562 5.01896C12.6441 5.10686 12.7634 5.15625 12.8877 5.15625C13.012 5.15625 13.1312 5.10686 13.2192 5.01896C13.3071 4.93105 13.3564 4.81182 13.3564 4.6875C13.3547 4.56339 13.3062 4.44452 13.2205 4.35469C13.1759 4.31201 13.1234 4.27856 13.0658 4.25625ZM12.8877 6.09375C12.7634 6.09375 12.6441 6.14314 12.5562 6.23104C12.4683 6.31895 12.4189 6.43818 12.4189 6.5625V7.96875C12.4189 8.09307 12.4683 8.2123 12.5562 8.30021C12.6441 8.38811 12.7634 8.4375 12.8877 8.4375C13.012 8.4375 13.1312 8.38811 13.2192 8.30021C13.3071 8.2123 13.3564 8.09307 13.3564 7.96875V6.5625C13.3564 6.43818 13.3071 6.31895 13.2192 6.23104C13.1312 6.14314 13.012 6.09375 12.8877 6.09375ZM12.8877 9.375C12.7634 9.375 12.6441 9.42439 12.5562 9.51229C12.4683 9.6002 12.4189 9.71943 12.4189 9.84375V13.125C12.4189 13.2493 12.3696 13.3685 12.2817 13.4565C12.1937 13.5444 12.0745 13.5937 11.9502 13.5937H4.4502C4.32588 13.5937 4.20665 13.5444 4.11874 13.4565C4.03083 13.3685 3.98145 13.2493 3.98145 13.125V4.6875C3.98145 4.56318 3.93206 4.44395 3.84415 4.35604C3.75624 4.26814 3.63702 4.21875 3.5127 4.21875C3.38838 4.21875 3.26915 4.26814 3.18124 4.35604C3.09333 4.44395 3.04395 4.56318 3.04395 4.6875V13.125C3.04395 13.498 3.1921 13.8556 3.45583 14.1194C3.71955 14.3831 4.07723 14.5312 4.4502 14.5312H11.9502C12.3232 14.5312 12.6808 14.3831 12.9446 14.1194C13.2083 13.8556 13.3564 13.498 13.3564 13.125V9.84375C13.3564 9.71943 13.3071 9.6002 13.2192 9.51229C13.1312 9.42439 13.012 9.375 12.8877 9.375Z"
                    fill="#fff"
                  />
                  <path
                    d="M6.3252 11.25V5.15625C6.3252 5.03193 6.27581 4.9127 6.1879 4.82479C6.09999 4.73689 5.98077 4.6875 5.85645 4.6875C5.73213 4.6875 5.6129 4.73689 5.52499 4.82479C5.43708 4.9127 5.3877 5.03193 5.3877 5.15625V11.25C5.3877 11.3743 5.43708 11.4935 5.52499 11.5815C5.6129 11.6694 5.73213 11.7188 5.85645 11.7188C5.98077 11.7188 6.09999 11.6694 6.1879 11.5815C6.27581 11.4935 6.3252 11.3743 6.3252 11.25ZM8.66895 11.25V5.15625C8.66895 5.03193 8.61956 4.9127 8.53165 4.82479C8.44374 4.73689 8.32452 4.6875 8.2002 4.6875C8.07588 4.6875 7.95665 4.73689 7.86874 4.82479C7.78083 4.9127 7.73145 5.03193 7.73145 5.15625V11.25C7.73145 11.3743 7.78083 11.4935 7.86874 11.5815C7.95665 11.6694 8.07588 11.7188 8.2002 11.7188C8.32452 11.7188 8.44374 11.6694 8.53165 11.5815C8.61956 11.4935 8.66895 11.3743 8.66895 11.25ZM11.0127 11.25V5.15625C11.0127 5.03193 10.9633 4.9127 10.8754 4.82479C10.7875 4.73689 10.6683 4.6875 10.5439 4.6875C10.4196 4.6875 10.3004 4.73689 10.2125 4.82479C10.1246 4.9127 10.0752 5.03193 10.0752 5.15625V11.25C10.0752 11.3743 10.1246 11.4935 10.2125 11.5815C10.3004 11.6694 10.4196 11.7188 10.5439 11.7188C10.6683 11.7188 10.7875 11.6694 10.8754 11.5815C10.9633 11.4935 11.0127 11.3743 11.0127 11.25Z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_478_187">
                    <rect
                      width="15"
                      height="15"
                      fill="#fff"
                      transform="translate(0.700195)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="sr-only">Delete Container</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="border-b-2 border-[#FFFFFF66] pb-1.5 mb-4">
          <div className="flex justify-between items-center">
            <nav className="space-x-8">
              <ServiceNavItem
                id={id as string}
                url={configPages.LOGS.path}
                name="Logs"
              />
              <ServiceNavItem
                id={id as string}
                url={configPages.EVENTS.path}
                name="Events"
              />
              {/* <ServiceNavItem id={id} url={configPages.REVISION.path} name="Revision" /> */}
              {/* <ServiceNavItem id={id} url={configPages.INSPECT.path} name="Inspect" /> */}
              {/* <ServiceNavItem id={id} url={configPages.FILES.path} name="Files" /> */}
              {/* <ServiceNavItem id={id} url={configPages.NETWORKING.path} name="Networking" /> */}
              {/* <ServiceNavItem id={id} url={configPages.INTEGREGATION.path} name="Integregation" /> */}
              {/* <ServiceNavItem id={id} url={configPages.TRIGGERS.path} name="Triggers" /> */}
            </nav>

            <div>
              <div className="flex space-x-2">
                <button onClick={() => handleRefresh()} className="ml-3">
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
                {/* <Input
                  placeholder="Search logs"
                  type="text"
                  className={`bg-[#F5F5F7] py-2 px-12 pl-10 h-9 border-0 ${
                    isSearch ? "" : "hidden opacity-0"
                  } `}
                  iconLeft={`
                            <svg class=${
                              isSearch ? "" : "hidden opacity-0"
                            }  width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        `}
                /> */}

                {/* <ul className="hidden sm:flex overflow-hidden rounded-lg bg-transparent border border-[#ffffff80] h-[34px]">
                  <button
                    onClick={() => toggleSearchInput()}
                    className="py-1 px-4 border-r border-r-[E5E9EB]"
                  >
                    {!isSearch && (
                      <svg
                        className="h-5 w-5"
                        width="21"
                        height="24"
                        viewBox="0 0 21 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 6.00077C6.93913 6.00077 5.92172 6.42219 5.17157 7.17234C4.42143 7.92248 4 8.9399 4 10.0008C4 11.0616 4.42143 12.079 5.17157 12.8292C5.92172 13.5793 6.93913 14.0008 8 14.0008C9.06087 14.0008 10.0783 13.5793 10.8284 12.8292C11.5786 12.079 12 11.0616 12 10.0008C12 8.9399 11.5786 7.92248 10.8284 7.17234C10.0783 6.42219 9.06087 6.00077 8 6.00077ZM2 10.0008C1.99988 9.05647 2.22264 8.12548 2.65017 7.28351C3.0777 6.44154 3.69792 5.71236 4.4604 5.15529C5.22287 4.59822 6.10606 4.22898 7.03815 4.0776C7.97023 3.92622 8.92488 3.99698 9.82446 4.28412C10.724 4.57126 11.5432 5.06667 12.2152 5.73006C12.8872 6.39346 13.3931 7.2061 13.6919 8.1019C13.9906 8.9977 14.0737 9.95136 13.9343 10.8853C13.795 11.8193 13.4372 12.7072 12.89 13.4768L17.707 18.2938C17.8892 18.4824 17.99 18.735 17.9877 18.9972C17.9854 19.2594 17.8802 19.5102 17.6948 19.6956C17.5094 19.881 17.2586 19.9862 16.9964 19.9884C16.7342 19.9907 16.4816 19.8899 16.293 19.7078L11.477 14.8918C10.5794 15.53 9.52335 15.9089 8.42468 15.9869C7.326 16.0648 6.22707 15.8389 5.2483 15.3337C4.26953 14.8286 3.44869 14.0638 2.87572 13.1231C2.30276 12.1824 1.99979 11.1022 2 10.0008Z"
                          fill="#fff"
                        />
                      </svg>
                    )}
                    {isSearch && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M7.6448 6.49931L12.7598 1.39184C12.9127 1.23894 12.9986 1.03156 12.9986 0.815321C12.9986 0.599084 12.9127 0.391704 12.7598 0.238802C12.607 0.0858997 12.3996 0 12.1834 0C11.9672 0 11.7598 0.0858997 11.6069 0.238802L6.5 5.35439L1.39308 0.238802C1.24019 0.0858997 1.03283 1.91984e-07 0.816619 1.93595e-07C0.600406 1.95207e-07 0.393048 0.0858997 0.240162 0.238802C0.0872761 0.391704 0.0013858 0.599084 0.0013858 0.815321C0.0013858 1.03156 0.0872761 1.23894 0.240162 1.39184L5.35521 6.49931L0.240162 11.6068C0.164063 11.6823 0.103661 11.7721 0.0624418 11.871C0.0212221 11.97 0 12.0761 0 12.1833C0 12.2905 0.0212221 12.3966 0.0624418 12.4956C0.103661 12.5945 0.164063 12.6843 0.240162 12.7598C0.31564 12.8359 0.405438 12.8963 0.504377 12.9376C0.603316 12.9788 0.709437 13 0.816619 13C0.923801 13 1.02992 12.9788 1.12886 12.9376C1.2278 12.8963 1.3176 12.8359 1.39308 12.7598L6.5 7.64423L11.6069 12.7598C11.6824 12.8359 11.7722 12.8963 11.8711 12.9376C11.9701 12.9788 12.0762 13 12.1834 13C12.2906 13 12.3967 12.9788 12.4956 12.9376C12.5946 12.8963 12.6844 12.8359 12.7598 12.7598C12.8359 12.6843 12.8963 12.5945 12.9376 12.4956C12.9788 12.3966 13 12.2905 13 12.1833C13 12.0761 12.9788 11.97 12.9376 11.871C12.8963 11.7721 12.8359 11.6823 12.7598 11.6068L7.6448 6.49931Z"
                          fill="#fff"
                        />
                      </svg>
                    )}
                  </button>

                  <button className="py-1 px-4 border-r border-r-[E5E9EB]">
                    <svg
                      className="h-4 w-4"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 4V3C6 2.05719 6 1.58579 6.2929 1.29289C6.5858 1 7.0572 1 8 1H13C13.9428 1 14.4142 1 14.7071 1.29289C15 1.58579 15 2.05719 15 3V8C15 8.9428 15 9.4142 14.7071 9.7071C14.4142 10 13.9428 10 13 10H12M3 15H8C8.9428 15 9.4142 15 9.7071 14.7071C10 14.4142 10 13.9428 10 13V8C10 7.0572 10 6.5858 9.7071 6.2929C9.4142 6 8.9428 6 8 6H3C2.05719 6 1.58579 6 1.29289 6.2929C1 6.5858 1 7.0572 1 8V13C1 13.9428 1 14.4142 1.29289 14.7071C1.58579 15 2.05719 15 3 15Z"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>

                  <button className="py-1 px-4">
                    <svg
                      className="h-4 w-4"
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_478_187)">
                        <path
                          d="M14.7627 2.34375H10.4971C10.3895 1.81393 10.102 1.33759 9.68344 0.995448C9.26484 0.653306 8.74083 0.4664 8.2002 0.4664C7.65956 0.4664 7.13555 0.653306 6.71695 0.995448C6.29835 1.33759 6.01091 1.81393 5.90332 2.34375H1.6377C1.51338 2.34375 1.39415 2.39314 1.30624 2.48104C1.21833 2.56895 1.16895 2.68818 1.16895 2.8125C1.16895 2.93682 1.21833 3.05605 1.30624 3.14396C1.39415 3.23186 1.51338 3.28125 1.6377 3.28125H14.7627C14.887 3.28125 15.0062 3.23186 15.0942 3.14396C15.1821 3.05605 15.2314 2.93682 15.2314 2.8125C15.2314 2.68818 15.1821 2.56895 15.0942 2.48104C15.0062 2.39314 14.887 2.34375 14.7627 2.34375ZM8.2002 1.40625C8.49033 1.40707 8.7731 1.4976 9.00976 1.66544C9.24641 1.83328 9.42536 2.07021 9.52207 2.34375H6.87832C6.97503 2.07021 7.15398 1.83328 7.39063 1.66544C7.62729 1.4976 7.91007 1.40707 8.2002 1.40625ZM13.0658 4.25625C12.9805 4.22035 12.8864 4.21055 12.7954 4.22806C12.7045 4.24558 12.6208 4.28964 12.5549 4.35469C12.5114 4.39849 12.4771 4.45043 12.4537 4.50754C12.4304 4.56465 12.4186 4.62581 12.4189 4.6875C12.4189 4.81182 12.4683 4.93105 12.5562 5.01896C12.6441 5.10686 12.7634 5.15625 12.8877 5.15625C13.012 5.15625 13.1312 5.10686 13.2192 5.01896C13.3071 4.93105 13.3564 4.81182 13.3564 4.6875C13.3547 4.56339 13.3062 4.44452 13.2205 4.35469C13.1759 4.31201 13.1234 4.27856 13.0658 4.25625ZM12.8877 6.09375C12.7634 6.09375 12.6441 6.14314 12.5562 6.23104C12.4683 6.31895 12.4189 6.43818 12.4189 6.5625V7.96875C12.4189 8.09307 12.4683 8.2123 12.5562 8.30021C12.6441 8.38811 12.7634 8.4375 12.8877 8.4375C13.012 8.4375 13.1312 8.38811 13.2192 8.30021C13.3071 8.2123 13.3564 8.09307 13.3564 7.96875V6.5625C13.3564 6.43818 13.3071 6.31895 13.2192 6.23104C13.1312 6.14314 13.012 6.09375 12.8877 6.09375ZM12.8877 9.375C12.7634 9.375 12.6441 9.42439 12.5562 9.51229C12.4683 9.6002 12.4189 9.71943 12.4189 9.84375V13.125C12.4189 13.2493 12.3696 13.3685 12.2817 13.4565C12.1937 13.5444 12.0745 13.5937 11.9502 13.5937H4.4502C4.32588 13.5937 4.20665 13.5444 4.11874 13.4565C4.03083 13.3685 3.98145 13.2493 3.98145 13.125V4.6875C3.98145 4.56318 3.93206 4.44395 3.84415 4.35604C3.75624 4.26814 3.63702 4.21875 3.5127 4.21875C3.38838 4.21875 3.26915 4.26814 3.18124 4.35604C3.09333 4.44395 3.04395 4.56318 3.04395 4.6875V13.125C3.04395 13.498 3.1921 13.8556 3.45583 14.1194C3.71955 14.3831 4.07723 14.5312 4.4502 14.5312H11.9502C12.3232 14.5312 12.6808 14.3831 12.9446 14.1194C13.2083 13.8556 13.3564 13.498 13.3564 13.125V9.84375C13.3564 9.71943 13.3071 9.6002 13.2192 9.51229C13.1312 9.42439 13.012 9.375 12.8877 9.375Z"
                          fill="#fff"
                        />
                        <path
                          d="M6.3252 11.25V5.15625C6.3252 5.03193 6.27581 4.9127 6.1879 4.82479C6.09999 4.73689 5.98077 4.6875 5.85645 4.6875C5.73213 4.6875 5.6129 4.73689 5.52499 4.82479C5.43708 4.9127 5.3877 5.03193 5.3877 5.15625V11.25C5.3877 11.3743 5.43708 11.4935 5.52499 11.5815C5.6129 11.6694 5.73213 11.7188 5.85645 11.7188C5.98077 11.7188 6.09999 11.6694 6.1879 11.5815C6.27581 11.4935 6.3252 11.3743 6.3252 11.25ZM8.66895 11.25V5.15625C8.66895 5.03193 8.61956 4.9127 8.53165 4.82479C8.44374 4.73689 8.32452 4.6875 8.2002 4.6875C8.07588 4.6875 7.95665 4.73689 7.86874 4.82479C7.78083 4.9127 7.73145 5.03193 7.73145 5.15625V11.25C7.73145 11.3743 7.78083 11.4935 7.86874 11.5815C7.95665 11.6694 8.07588 11.7188 8.2002 11.7188C8.32452 11.7188 8.44374 11.6694 8.53165 11.5815C8.61956 11.4935 8.66895 11.3743 8.66895 11.25ZM11.0127 11.25V5.15625C11.0127 5.03193 10.9633 4.9127 10.8754 4.82479C10.7875 4.73689 10.6683 4.6875 10.5439 4.6875C10.4196 4.6875 10.3004 4.73689 10.2125 4.82479C10.1246 4.9127 10.0752 5.03193 10.0752 5.15625V11.25C10.0752 11.3743 10.1246 11.4935 10.2125 11.5815C10.3004 11.6694 10.4196 11.7188 10.5439 11.7188C10.6683 11.7188 10.7875 11.6694 10.8754 11.5815C10.9633 11.4935 11.0127 11.3743 11.0127 11.25Z"
                          fill="#fff"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_478_187">
                          <rect
                            width="15"
                            height="15"
                            fill="#fff"
                            transform="translate(0.700195)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="sr-only">Delete Container</span>
                  </button>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* @ts-ignore */}
          <Outlet key={refreshFlag} />
        </div>
      </section>
    </Container>
  );
}

export default ServicesShow;
