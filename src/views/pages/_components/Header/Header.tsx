import Container from "atoms/Container";
import {
  DropdownItem,
  DropdownMenuWrap,
  DropdownRoot,
  DropdownTrigger,
} from "molecules/Dropdown";
import Logout from "pages/Auth/Logout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { Transition } from "@headlessui/react";
import useUserCredits from "pages/contexts/useUserCredits";
import Credits from "../Stripe/Credits";
import useAuth from "context/AuthContext/useAuth";
import profileLogo from "assets/images/profile-logo.svg";

const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function Header() {
  const { session } = useAuth();
  const [showSideBar, setShowSideBar] = useState(false);
  const { updateCredits, setIsCreditsLoading, setTxnArray } = useUserCredits();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("access_token");
    const tokenInterval = window.setInterval(() => {
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

      clearInterval(tokenInterval);
    }, 500);
  }, []);

  return (
    <header>
      <div className="z-[100] flex exobp:hidden fixed top-0 left-0 justify-between w-full px-6 py-5 bg-[#0C1015] ">
        <div className="exobp:hidden">
          <button
            className="flex h-6 w-6 items-center"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            {showSideBar ? (
              <svg
                width="17"
                height="17"
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
            ) : (
              <svg
                width="23"
                height="16"
                viewBox="0 0 23 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.125 1.25H21.4375"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M7.89587 8.02083H21.4375"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M1.125 14.7917H21.4375"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        <Link
          to="https://docs.exopods.com/"
          className="font-normal text-sm text-[#fff]"
          target="_blank"
        >
          Docs
        </Link>
      </div>
      <div className="fixed z-[200] top-0">
        <Transition
          show={showSideBar}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        </Transition>
      </div>
      <Container className="!p-[14px_48px_14px_32px] hidden exobp:block border border-[#BBBBBB26] border-l-0">
        <div className="flex z-[100]">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-2 items-center">
              <div className="flex gap-[6px]">
                <img src="/src/assets/icons/home-line.svg" alt="" />
                <p className="text-[#FFFFFF] text-[20px] font-medium">
                  Dashboard{" "}
                </p>
              </div>
              {/* <div className="text-[#C4C4C4A8] ">/</div>
              <div>
                <p className="text-[#EDEDED] font-medium text-[14px]">Nikhil's projects</p>
              </div> */}
            </div>
            <div className="flex items-center space-x-5">
              {/* <button>
                    <span className="sr-only">Settings</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                        <path d="M11.9946 14.1483C13.7335 14.1483 15.143 12.7387 15.143 10.9999C15.143 9.26098 13.7335 7.85143 11.9946 7.85143C10.2557 7.85143 8.84619 9.26098 8.84619 10.9999C8.84619 12.7387 10.2557 14.1483 11.9946 14.1483Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.5 11.9235V10.0765C1.5 8.98502 2.39205 8.08247 3.494 8.08247C5.39355 8.08247 6.17017 6.73914 5.21514 5.09146C4.66942 4.14694 4.99475 2.91905 5.94978 2.37332L7.76537 1.33434C8.59445 0.841089 9.66492 1.13494 10.1582 1.96403L10.2736 2.16343C11.2181 3.8111 12.7714 3.8111 13.7264 2.16343L13.8418 1.96403C14.3351 1.13494 15.4055 0.841089 16.2346 1.33434L18.0502 2.37332C19.0052 2.91905 19.3306 4.14694 18.7849 5.09146C17.8298 6.73914 18.6064 8.08247 20.506 8.08247C21.5975 8.08247 22.5 8.97452 22.5 10.0765V11.9235C22.5 13.015 21.6079 13.9175 20.506 13.9175C18.6064 13.9175 17.8298 15.2609 18.7849 16.9086C19.3306 17.8636 19.0052 19.081 18.0502 19.6267L16.2346 20.6657C15.4055 21.1589 14.3351 20.8651 13.8418 20.036L13.7264 19.8366C12.7819 18.1889 11.2286 18.1889 10.2736 19.8366L10.1582 20.036C9.66492 20.8651 8.59445 21.1589 7.76537 20.6657L5.94978 19.6267C4.99475 19.081 4.66942 17.8531 5.21514 16.9086C6.17017 15.2609 5.39355 13.9175 3.494 13.9175C2.39205 13.9175 1.5 13.015 1.5 11.9235Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button> */}

              {/* <button>
                    <div className="relative">
                        <div className="absolute rounded-full bg-[#F45B5B] h-4 w-4 z-10 -right-2 -top-2">
                        <div className="flex items-center align-middle w-full">
                            <span className="block w-full text-xs text-white">1</span>
                        </div>
                        </div>
                        <span className="sr-only">Notification</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                            <path d="M18.3566 9.59393C17.9989 9.59393 17.7087 9.29986 17.7087 8.93753C17.7087 6.42395 16.743 4.0618 14.9894 2.28427C14.7363 2.02786 14.7363 1.61216 14.9894 1.35576C15.2424 1.09935 15.6527 1.09935 15.906 1.35576C17.904 3.38089 19.0045 6.07395 19.0045 8.93753C19.0045 9.29986 18.7142 9.59393 18.3566 9.59393V9.59393Z" fill="#0C0B0B"/>
                            <path d="M0.64788 9.59389C0.290249 9.59389 0 9.29982 0 8.93749C0 6.07391 1.10057 3.38085 3.09941 1.35652C3.35249 1.10011 3.76295 1.10011 4.01603 1.35652C4.26911 1.61293 4.26911 2.02878 4.01603 2.28519C2.26157 4.06177 1.29576 6.42391 1.29576 8.93749C1.29576 9.29982 1.00551 9.59389 0.64788 9.59389Z" fill="#0C0B0B"/>
                            <path d="M9.50234 21.1904C7.71592 21.1904 6.26294 19.7183 6.26294 17.9084C6.26294 17.5461 6.55319 17.252 6.91082 17.252C7.26845 17.252 7.5587 17.5461 7.5587 17.9084C7.5587 18.9946 8.43024 19.8776 9.50234 19.8776C10.5743 19.8776 11.446 18.9946 11.446 17.9084C11.446 17.5461 11.7362 17.252 12.0939 17.252C12.4515 17.252 12.7417 17.5461 12.7417 17.9084C12.7417 19.7183 11.2888 21.1904 9.50234 21.1904V21.1904Z" fill="#0C0B0B"/>
                            <path d="M16.6285 18.5647H2.37511C1.54137 18.5647 0.863281 17.8777 0.863281 17.0332C0.863281 16.5849 1.05594 16.1606 1.39206 15.8691C2.70585 14.7444 3.4548 13.1097 3.4548 11.3777V8.93747C3.4548 5.55932 6.16732 2.81113 9.50178 2.81113C12.8361 2.81113 15.5486 5.55932 15.5486 8.93747V11.3777C15.5486 13.1097 16.2976 14.7444 17.6028 15.863C17.9475 16.1606 18.1401 16.5849 18.1401 17.0332C18.1401 17.8777 17.462 18.5647 16.6285 18.5647V18.5647ZM9.50178 4.12393C6.88163 4.12393 4.75056 6.28303 4.75056 8.93747V11.3777C4.75056 13.4964 3.8341 15.4971 2.23686 16.8651C2.20665 16.8914 2.15904 16.9457 2.15904 17.0332C2.15904 17.1521 2.25758 17.2519 2.37511 17.2519H16.6285C16.7458 17.2519 16.8444 17.1521 16.8444 17.0332C16.8444 16.9457 16.7969 16.8914 16.7683 16.8668C15.1693 15.4971 14.2528 13.4964 14.2528 11.3777V8.93747C14.2528 6.28303 12.1218 4.12393 9.50178 4.12393V4.12393Z" fill="#0C0B0B"/>
                            <path d="M9.50213 4.12385C9.1445 4.12385 8.85425 3.82979 8.85425 3.46745V0.841855C8.85425 0.479521 9.1445 0.185455 9.50213 0.185455C9.85976 0.185455 10.15 0.479521 10.15 0.841855V3.46745C10.15 3.82979 9.85976 4.12385 9.50213 4.12385Z" fill="#0C0B0B"/>
                        </svg>
                    </div>
                </button> */}
              <Credits />
              <Link
                to="https://docs.exopods.com/"
                className="font-normal text-sm text-[#fff]"
                target="_blank"
              >
                Docs
              </Link>
              <DropdownRoot>
                <DropdownTrigger>
                  <div className="flex items-center space-x-2">
                    {session && session?.user?.user_metadata?.avatar_url ? (
                      <img
                        src={session?.user?.user_metadata?.avatar_url}
                        className="rounded-lg object-fit h-8 w-8"
                        alt="profile image"
                      />
                    ) : (
                      <div className="border border-[#BBBBBBB0] p-2 rounded-full w-8 h-8">
                        <img
                          src={profileLogo}
                          className="object-fit"
                          alt="profile image"
                        />
                      </div>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                    >
                      <path
                        d="M5.93002 5.76746L9.82191 1.86436C10.0594 1.62622 10.0594 1.24001 9.82191 1.00187C9.58441 0.76368 9.1994 0.76368 8.9619 1.00187L6.10812 3.86387C6.10812 3.86387 5.82095 4.1864 5.50233 4.17963C5.19136 4.17303 4.8919 3.86387 4.8919 3.86387L2.03812 1.00196C1.80062 0.763777 1.41562 0.763777 1.17811 1.00196C1.05946 1.12101 1.00001 1.27713 1.00001 1.43321C1.00001 1.58928 1.05946 1.74536 1.17811 1.86445L5.07001 5.76746C5.30751 6.00565 5.69251 6.00565 5.93002 5.76746Z"
                        fill="#fff"
                        stroke="#fff"
                        stroke-width="0.5"
                      />
                    </svg>
                  </div>
                </DropdownTrigger>
                <DropdownMenuWrap className="py-2 w-36">
                  <DropdownItem>
                    <div className="hover:bg-[#ffffff10] w-full py-1">
                      <Logout className="text-xs text-[#fff] w-full h-full">
                        Logout
                      </Logout>
                    </div>
                  </DropdownItem>
                </DropdownMenuWrap>
              </DropdownRoot>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
