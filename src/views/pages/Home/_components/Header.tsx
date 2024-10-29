import Menu from "./Menu";
import exoLogo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import discordWhiteImg from "assets/images/discord-white.gif";

interface IMenu {
  showMenu?: boolean;
  setShowMenu?: (value: boolean) => void | undefined;
}

export default function Header({ showMenu, setShowMenu }: IMenu) {
  const handleClick = () => {
    // This will scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed left-0 top-0 z-[100] w-full">
      <div
        className={
          "flex h-[95px] items-center justify-between border-b-[1px] border-solid border-[#2E2929] md:bg-transparent px-[5%] py-4 " +
          (showMenu ? "bg-[#0C1015]" : "backdrop-blur-sm")
        }
      >
        <Link to="/" className="flex gap-4 items-center cursor-pointer" onClick={handleClick}>
          <img className="h-[43px] w-auto" src={exoLogo} alt="logo" />
          <span className="text-[#fff] text-[30px] fsm:text-[30px] md:text-[36px] font-semibold">
            exopods
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link to="https://discord.gg/dhHZAvMvvB" target="_blank" rel="noopener noreferrer">
            <img
              className="h-[43px] w-auto"
              src={discordWhiteImg}
              alt="discord gif"
            />
          </Link>
          <button
            className="flex h-6 w-6 items-center md:hidden"
            onClick={() => setShowMenu?.(!showMenu)}
          >
            {showMenu ? (
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7.89587 8.02083H21.4375"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1.125 14.7917H21.4375"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
          <div className="hidden items-center gap-5 md:flex">
            <Menu />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="bg-[#0C1015] absolute z-50 flex w-screen flex-col items-center gap-4 px-9 py-7 md:hidden">
          <Menu />
        </div>
      )}
    </div>
  );
}
