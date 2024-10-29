import { Link } from "react-router-dom";
import ServicesLink from "./ServicesLink";
import useAuth from "context/AuthContext/useAuth";
import PricingSectionScroll from "../utils/PricingSectionScroll";

export default function Menu() {
  const { session } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    PricingSectionScroll();
  };

  return (
    <>
      <a
        href="#pricing"
        onClick={handleClick}
        className="text-[15px] font-normal text-[#fff]"
      >
        Pricing
      </a>
      <Link
        to="https://docs.exopods.com/"
        target="_blank"
        className="text-[15px] font-normal text-[#fff]"
      >
        Docs
      </Link>
      {session ? (
        <ServicesLink
          text="Launch"
          arrow={false}
          className="mt-6 rounded-lg bg-transparent border-[1px] border-[#fff] px-[20px] py-[8px] text-[15px] font-normal text-[#D2A8FF] md:mt-0"
        />
      ) : (
        <Link
          to={"/signin"}
          className="mt-6 rounded-lg bg-transparent border-[1px] border-[#fff] px-[20px] py-[8px] text-[15px] font-normal text-[#D2A8FF] md:mt-0"
        >
          Launch
        </Link>
      )}
    </>
  );
}
