import { Link } from "react-router-dom";
import discordBlueImg from "assets/images/discord-blue.gif";

function BorderGradient() {
  return (
    <>
      <div className="absolute z-[50] top-[-0.5px] right-[10%]">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoBorderOne.png"
          alt=""
          className="h-[0.5px] w-full md:w-[500px]"
        />
      </div>
      <div className="absolute z-[50] bottom-[-0.5px] left-[10%]">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoBorderOne.png"
          alt=""
          className="h-[0.5px] w-full md:w-[600px]"
        />
      </div>
    </>
  );
}

export default function Connect() {
  return (
    <div className="px-[5%] mt-[150px] mb-32">
      <div className="rounded-[30px] border-[1px] border-[#ffffff35] p-8 fsm:p-12 relative">
        <div>
          <span className="text-[40px] sm:text-[50px] md:text-[60px] leading-[50px] md:leading-[70px] text-[#fff] font-medium">
            Need Help? Connect with us on Discord
          </span>
          <p className="text-[16px] text-[#8B949E] mt-[18px]">
            We are available 24x7 to help you with your issues, feedbacks or
            feature requests.
          </p>
        </div>
        <div className="mt-[100px] flex justify-between items-center flex-wrap">
          <Link
            to="https://discord.gg/dhHZAvMvvB"
            target="_blank"
            className="flex gap-[14px] items-center rounded-[15px] border border-[#AA86E3] py-[8px] px-[25px] max-w-max"
          >
            <img
              className="h-[43px] w-auto"
              src={discordBlueImg}
              alt="discord gif"
            />
            <span className="font-medium text-base fsm:text-[20px] text-[#fff]">
              Join our Discord
            </span>
          </Link>
          <div className="hidden lg:flex">
            <img
              src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/connectImg.png"
              alt="connect design"
            />
          </div>
        </div>
        <BorderGradient />
      </div>
    </div>
  );
}
