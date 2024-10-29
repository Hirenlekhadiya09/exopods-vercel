import { Link } from "react-router-dom";
import HeroHeading from "./HeroHeading";
import PhAwardSVG from "assets/images/PhAward.svg";
import useAuth from "context/AuthContext/useAuth";

function BorderGradient() {
  return (
    <>
      <div className="max-w-max absolute z-[50] top-[-0.5px] right-[10%]">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoBorderOne.png"
          alt=""
          className="h-[0.5px] w-[150px]"
        />
      </div>
      <div className="absolute z-[50] bottom-[-0.5px] left-[10%]">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoBorderOne.png"
          alt=""
          className="h-[0.5px] w-[50%]"
        />
      </div>
    </>
  );
}

export default function Hero() {
  const { session } = useAuth();

  return (
    <div className="pl-[5%] pr-[5%] fsm:pr-[5%] pt-28 pb-16">
      <div className="mt-0 fsm:mt-[25px] flex flex-col items-center">
        <Link
          to="https://www.producthunt.com/posts/exopods"
          target="_blank"
          className="mb-6"
        >
          <img
            src={PhAwardSVG}
            className="w-[120px] lg:w-full"
            alt="ph award"
          />
        </Link>
        <div className="max-w-max bg-[#24292F88] mb-3 px-5 py-2 flex flex-col gap-10 justify-between items-center rounded-[10px] border-[1px] border-[#8B949E4D] relative">
          <span className="text-[#56D364] text-[12px]">
            $5 worth of free credit with every sign-up
          </span>
          <BorderGradient />
        </div>
        <HeroHeading />
        <p className="text-center max-w-[600px] text-[14px] fsm:text-[16px] text-[#878593] mt-[20px]">
          Built for any language, designed for projects big and small. Exopods
          simplifies cloud deployments, making it effortless to bring your apps
          to life.
        </p>
        {session ? (
          <Link
            to="/services"
            className={`z-[80] rounded-[10px] text-base text-[#000] font-medium px-[26px] py-[13px] mt-6 fsm:mt-8 bg-[#fff] flex gap-3 max-w-max`}
          >
            Deploy Now
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4615 18L20 12.5199M20 12.5199L14.4615 7M20 12.5199H2"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <Link
            to={"/signin"}
            className={`z-[80] rounded-[10px] text-base text-[#000] font-medium px-[26px] py-[13px] mt-8 fsm:mt-12 bg-[#fff] flex gap-3 max-w-max`}
          >
            Deploy Now
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4615 18L20 12.5199M20 12.5199L14.4615 7M20 12.5199H2"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        )}
        <div className="md:-mt-16 lg:-mt-24 2xl:-mt-36 min-[1650px]:-mt-40 min-[1850px]:-mt-48">
          <img
            src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/heroDashboard.png"
            alt="hero dashboard"
          />
        </div>
      </div>
    </div>
  );
}
