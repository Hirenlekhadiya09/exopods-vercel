// import { useAuth0 } from "@auth0/auth0-react";
// import NavList from "../Navigation/_components/NavList";
import Logout from "pages/Auth/Logout";
import { configMenu } from "config/menu/menuConfig";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Credits from "../Stripe/Credits";
import useAuth from "context/AuthContext/useAuth";
import profileLogo from "assets/images/profile-logo.svg";

interface SideBarProps {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
}

export default function SideBar({ showSideBar, setShowSideBar }: SideBarProps) {
  const sidebarRef = useRef(null);
  // const { isAuthenticated, user } = useAuth0();
  const { session } = useAuth();

  function handleClickOutside(e: MouseEvent) {
    // @ts-ignore
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setShowSideBar(false);
    }
  }

  window.addEventListener("click", handleClickOutside);

  return (
    <div className="flex exobp:hidden w-screen h-screen">
      <div
        ref={sidebarRef}
        className="py-5 px-6 w-full flex flex-col gap-6 overflow-y-auto max-w-[80%] fsm:max-w-[400px] bg-[#1B2025]"
      >
        <div className="flex justify-between">
          <button
            className="flex h-6 w-6 items-center"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7916 1.20833L1.20825 15.7917M1.20825 1.20833L5.89575 5.89583M8.49992 8.5L15.7916 15.7917"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <Logout>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26521 20 9 20H5C3.6744 19.9984 2.40356 19.4711 1.46622 18.5338C0.528882 17.5964 0.00158786 16.3256 0 15V5C0.00158786 3.67441 0.528882 2.40356 1.46622 1.46622C2.40356 0.528882 3.6744 0.00158786 5 0H9C9.26521 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1C10 1.26522 9.89464 1.51957 9.70711 1.70711C9.51957 1.89464 9.26521 2 9 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V15C2 15.7956 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18H9C9.26521 18 9.51957 18.1054 9.70711 18.2929C9.89464 18.4804 10 18.7348 10 19ZM17.707 9.293L13.707 5.293C13.6148 5.19749 13.5044 5.12131 13.3824 5.0689C13.2604 5.01649 13.1292 4.9889 12.9964 4.98775C12.8636 4.9866 12.7319 5.0119 12.609 5.06218C12.4861 5.11246 12.3745 5.18671 12.2806 5.2806C12.1867 5.3745 12.1125 5.48615 12.0622 5.60905C12.0119 5.73194 11.9866 5.86362 11.9877 5.9964C11.9889 6.12918 12.0165 6.2604 12.0689 6.3824C12.1213 6.50441 12.1975 6.61475 12.293 6.707L14.586 9H7C6.73478 9 6.48043 9.10536 6.29289 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11H14.586L12.293 13.293C12.1975 13.3852 12.1213 13.4956 12.0689 13.6176C12.0165 13.7396 11.9889 13.8708 11.9877 14.0036C11.9866 14.1364 12.0119 14.2681 12.0622 14.391C12.1125 14.5138 12.1867 14.6255 12.2806 14.7194C12.3745 14.8133 12.4861 14.8875 12.609 14.9378C12.7319 14.9881 12.8636 15.0134 12.9964 15.0123C13.1292 15.0111 13.2604 14.9835 13.3824 14.9311C13.5044 14.8787 13.6148 14.8025 13.707 14.707L17.707 10.707C17.8945 10.5195 17.9998 10.2652 17.9998 10C17.9998 9.73484 17.8945 9.48053 17.707 9.293Z"
                fill="white"
              />
            </svg>
          </Logout>
        </div>
        {session && (
          <div className="flex gap-2 bg-[#0c101599] px-3 py-4 rounded-lg w-full">
            {session && session?.user?.user_metadata?.avatar_url ? (
              <img
                src={session?.user?.user_metadata?.avatar_url}
                className="rounded-lg object-fit h-9 w-9"
                alt="profile image"
              />
            ) : (
              <div className="border border-[#BBBBBBB0] p-2 rounded-full w-9 h-9">
                <img
                  src={profileLogo}
                  className="object-fit"
                  alt="profile image"
                />
              </div>
            )}
            <div className="flex flex-col gap-0">
              <span className="inline-block text-sm text-[#FAEFEF] font-medium">
                {session?.user?.user_metadata?.name}
              </span>
              <span className="text-xs text-[#FFFFFF80] font-normal break-all">
                {session?.user?.user_metadata?.email}
              </span>
            </div>
          </div>
        )}
        <Credits className="py-4 rounded-lg" />
        <div className="flex flex-col gap-5 h-full">
          {configMenu &&
            configMenu.primary.map((item) => (
              <div className="flex gap-3 items-center">
                <span>{item.icon}</span>
                <Link
                  to={item.url}
                  className="text-[#fff] text-sm font-normal"
                  onClick={() => setShowSideBar(!showSideBar)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
