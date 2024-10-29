import SectionHeading from "./SectionHeading";
import { useState, useEffect } from "react";
import ServicesLink from "./ServicesLink";
import { Link } from "react-router-dom";
import useAuth from "context/AuthContext/useAuth";
import PricingSectionScroll from "../utils/PricingSectionScroll";

export function PricingFeature({ feature }: { feature: string }) {
  return (
    <div className="flex gap-4 items-start">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="11.5"
          stroke="#2E90FA"
          stroke-opacity="0.3"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z"
          fill="#2E90FA"
          fill-opacity="0.7"
        />
      </svg>

      <span className="text-[14px] fsm:text-[16px] font-normal text-[#8B949E]">
        {feature}
      </span>
    </div>
  );
}

function PricingConsultFeature({ feature }: { feature: string }) {
  return (
    <div className="border border-[#BBBBBB29] rounded-[4px] text-[#fff] text-[14px] font-thin max-w-max flex gap-2 items-center p-[10px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.25 11.0357L8.4375 14.25L13.75 6.75"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {feature && feature}
    </div>
  );
}

interface PricingTypeProps {
  name: string;
  pricingPage?: boolean;
}

export function PricingType({ name, pricingPage = true }: PricingTypeProps) {
  return (
    <div className="flex gap-[10px] items-center mb-[10px]">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="40"
          height="40"
          rx="20"
          stroke="url(#paint0_linear_4269_1705)"
          stroke-opacity="0.5"
          stroke-width="3"
        />
        <path
          d="M22.8331 13.6665L15.4109 22.573C15.1203 22.9219 14.9749 23.0963 14.9727 23.2436C14.9708 23.3716 15.0278 23.4934 15.1274 23.5739C15.242 23.6665 15.469 23.6665 15.9231 23.6665H21.9997L21.1664 30.3332L28.5885 21.4266C28.8792 21.0778 29.0245 20.9034 29.0267 20.7561C29.0287 20.6281 28.9716 20.5063 28.872 20.4258C28.7574 20.3332 28.5304 20.3332 28.0764 20.3332H21.9997L22.8331 13.6665Z"
          stroke="url(#paint1_linear_4269_1705)"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4269_1705"
            x1="22"
            y1="2"
            x2="22"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F02849" />
            <stop offset="0.475" stop-color="#AA86E3" />
            <stop offset="1" stop-color="#12C2E9" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_4269_1705"
            x1="21.9997"
            y1="13.6665"
            x2="21.9997"
            y2="30.3332"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1570EF" />
            <stop offset="0.495" stop-color="#F02849" />
            <stop offset="1" stop-color="#AA86E3" />
          </linearGradient>
        </defs>
      </svg>

      <h4 className="text-[32px] fsm:text-[36px] max-w-max text-center md:text-[40px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00d0ff] to-[#F02849]">
        {name}
      </h4>
      {pricingPage && (
        <div className="text-[#56D364] text-[12px] bg-[#56D3642E] px-[10px] py-[5px] rounded-[4px] ml-auto whitespace-nowrap">
          Free trial
        </div>
      )}
    </div>
  );
}

export function Price({ price }: { price: string }) {
  return (
    <div className="font-semibold text-[#fff] mb-1">
      <span className="text-[22x] fsm:text-[28px]">${price}</span>
      <span className="text-[14px]">/hour</span>
    </div>
  );
}

interface PricingSuitableProps {
  type: string;
  pricingPage?: boolean;
  priceMonthly?: string;
}

export function PricingSuitable({
  type,
  pricingPage = true,
  priceMonthly = "",
}: PricingSuitableProps) {
  return (
    <div className="border-b border-b-[#FFFFFF1A] pb-2 flex justify-between items-start">
      <p className="text-[#FFFFFFA6] text-[14px] font-normal">{type}</p>
      {pricingPage && (
        <span className="text-[#F97316] font-semibold text-[12px] ml-auto whitespace-nowrap">
          Monthly: ${priceMonthly && priceMonthly}
        </span>
      )}
    </div>
  );
}

export default function Pricing() {
  const [isCPU, setIsCPU] = useState(true);
  const [toolTipHover, setToolTipHover] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#pricing") {
      setTimeout(() => {
        PricingSectionScroll();
      }, 100);
    }
  }, []);

  return (
    <div className="px-[5%] mt-[150px]" id="pricing">
      <SectionHeading
        name="Pricing"
        heading="Pay as you go"
        description="We have carefully designed our pricing to minimize cost, where you only pay for what you use with no hidden costs."
      />
      <div className="flex justify-center mt-8">
        <div className="z-[99] flex gap-2 border border-[#BBBBBB38] p-2 rounded-lg max-w-max font-semibold">
          <button
            onClick={() => setIsCPU(true)}
            className={`px-6 py-3 rounded-md ${
              isCPU
                ? "bg-[#fff] text-[#0C1015]"
                : "bg-[#44444470] text-[#FFFFFFCC]"
            }`}
          >
            CPU
          </button>
          <div
            onMouseEnter={() => setToolTipHover(true)}
            onMouseLeave={() => setToolTipHover(false)}
          >
            <button
              onClick={() => setIsCPU(false)}
              className={`line-through px-6 py-3 rounded-md relative ${
                isCPU
                  ? "bg-[#44444470] text-[#FFFFFFCC]"
                  : "bg-[#fff] text-[#0C1015]"
              }`}
              disabled
            >
              GPU
              {toolTipHover && (
                <span className="bg-[#1B2025] text-[#FFFFFFCC] inline-block absolute shadow-md w-[200px] text-[12px] rounded-lg font-normal px-3 py-2 left-[-70%] bottom-[-130%]">
                  We are working in order to enable GPU machines soon.
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {isCPU ? (
        <div className="flex flex-col items-center min-[1100px]:items-start min-[1100px]:flex-row gap-[30px] justify-center mt-12">
          <div className="border-[#BBBBBB1F] border-[1px] rounded-[18px] p-5 w-[350px] max-w-[100%]">
            <PricingType name="Micro" />
            <Price price="0.0278" />
            <PricingSuitable
              type="Suitable for static web apps"
              priceMonthly="20"
            />
            <div className="flex flex-col gap-3 max-w-[400px] lg:max-w-[250px] py-7 xl:max-w-[400px]">
              <PricingFeature feature="vcpu: 1" />
              <PricingFeature feature="Memory: 1GB" />
              <PricingFeature feature="Unlimited Requests" />
              <PricingFeature feature="SSL Secured" />
              <PricingFeature feature="Bring your own domain" />
              <PricingFeature feature="Launch Time: < 5 Seconds" />
            </div>
          </div>
          <div className="border-[#BBBBBB1F] border-[1px] rounded-[18px] p-5 w-[350px] max-w-[100%]">
            <PricingType name="Small" />
            <Price price="0.0486" />
            <PricingSuitable
              type="Suitable for dynamic web apps"
              priceMonthly="35"
            />
            <div className="flex flex-col gap-3 max-w-[400px] lg:max-w-[250px] py-7 xl:max-w-[400px]">
              <PricingFeature feature="vcpu: 2" />
              <PricingFeature feature="Memory: 2GB" />
              <PricingFeature feature="Unlimited Requests" />
              <PricingFeature feature="SSL Secured" />
              <PricingFeature feature="Bring your own domain" />
              <PricingFeature feature="Launch Time: < 10 Seconds" />
            </div>
          </div>
          <div className="border-[#BBBBBB1F] border-[1px] rounded-[18px] p-5 w-[350px] max-w-[100%]">
            <PricingType name="Large" />
            <Price price="0.0972" />
            <PricingSuitable
              type="Suitable for compute extensive apps"
              priceMonthly="70"
            />
            <div className="flex flex-col gap-3 max-w-[400px] lg:max-w-[250px] py-7 xl:max-w-[400px]">
              <PricingFeature feature="vcpu: 4" />
              <PricingFeature feature="Memory: 4GB" />
              <PricingFeature feature="Unlimited Requests" />
              <PricingFeature feature="SSL Secured" />
              <PricingFeature feature="Bring your own domain" />
              <PricingFeature feature="Launch Time: < 10 - 15 Seconds" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-[#fff]">GPU</h1>
        </div>
      )}
      <div className="flex flex-col items-center exobp:items-start max-w-[1110px] mx-auto">
        {session ? (
          <ServicesLink
            text="Start a new pod"
            arrow={true}
            className="rounded-[10px] text-base text-[#fff] px-[26px] py-[13px] mt-4 bg-gradient-to-r from-[#4776E6] to-[#8E54E9]"
          />
        ) : (
          <Link
            to={"/signin"}
            className="z-[80] flex gap-3 rounded-[10px] text-base text-[#fff] px-[26px] py-[13px] mt-4 bg-gradient-to-r from-[#4776E6] to-[#8E54E9]"
          >
            Start a new pod
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9615 18L20.5 12.5199M20.5 12.5199L14.9615 7M20.5 12.5199H2.5"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        )}
        <p className="text-[#FFFFFFCC] mt-3">
          Signup now to claim $5 worth of credits.
        </p>
      </div>
      <div className="mt-16 flex flex-col exobp:flex-row items-center exobp:items-start gap-[100px] max-w-[1110px] mx-auto">
        <div className="max-w-[290px]">
          <h5 className="text-[#fff] text-[32px] leading-9 font-semibold">
            Need better compute?
          </h5>
          <p className="text-[#FFFFFFCC] mt-3">
            For organizations with custom needs and advanced security
          </p>
          <Link
            to="https://discord.gg/dhHZAvMvvB"
            target="_blank"
            className="inline-block mt-8 rounded-lg bg-transparent border-[1px] border-[#fff] px-[20px] py-[8px] text-[15px] font-normal text-[#D2A8FF]"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex gap-4 flex-wrap max-w-[320px] exobp:max-w-none">
          <PricingConsultFeature feature="Advanced Support" />
          <PricingConsultFeature feature="Everything in Micro, Small & Large" />
          <PricingConsultFeature feature="Consulting services" />
          <PricingConsultFeature feature="More vCPU" />
          <PricingConsultFeature feature="More Memory" />
          <PricingConsultFeature feature="Flexible instance sizes" />
        </div>
      </div>
    </div>
  );
}
