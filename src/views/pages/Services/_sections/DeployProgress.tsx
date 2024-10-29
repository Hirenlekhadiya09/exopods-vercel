interface DotProps {
  color: string;
}

function Dot({ color }: DotProps) {
  return (
    <div
      className={`w-[3px] h-[3px] rounded-full`}
      style={{ backgroundColor: color }}
    ></div>
  );
}

function Dots() {
  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <div className="flex flex-col gap-[2px]">
        <Dot color="#1A73E8" />
        <Dot color="#1A73E8E3" />
        <Dot color="#1A73E899" />
        <Dot color="#1A73E866" />
        <Dot color="#1A73E833" />
      </div>
    </div>
  );
}

interface ProcessInfoProps {
  heading?: string;
  description?: string;
  inProcess: boolean;
  step?: number;
}

function ProcessInfo({ heading, description, inProcess }: ProcessInfoProps) {
  return (
    <div>
      {inProcess ? (
        <h4 className="text-[18px] text-[#fff] font-medium">{heading}</h4>
      ) : (
        <h4 className="text-[18px] text-[#FFFFFF66] font-medium">{heading}</h4>
      )}
      {inProcess && (
        <p className="text-[#FFFFFF80] text-[12px]">{description}</p>
      )}
    </div>
  );
}

function CompletedProcess({
  heading,
  description,
  inProcess,
}: ProcessInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full flex justify-center items-center border border-[#63C174]">
        <div
          className="w-10 h-10 rounded-full flex justify-center items-center"
          style={{
            background:
              "linear-gradient(166deg, rgba(99, 193, 116, 0.10) 44.29%, rgba(99, 193, 116, 0.00) 130.44%)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
              stroke="#63C174"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <ProcessInfo
        heading={heading}
        description={description}
        inProcess={inProcess}
      />
    </div>
  );
}

function CurrentProcess({
  heading,
  description,
  inProcess,
  step,
}: ProcessInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full flex justify-center items-center border border-[#1A73E8]">
        <div
          className="w-10 h-10 rounded-full flex justify-center items-center text-[#fff] text-[22px] font-medium"
          style={{
            background:
              "linear-gradient(166deg, rgba(255, 255, 255, 0.10) 44.29%, rgba(153, 153, 153, 0.00) 130.44%)",
          }}
        >
          {step}
        </div>
      </div>
      <ProcessInfo
        heading={heading}
        description={description}
        inProcess={inProcess}
      />
    </div>
  );
}

function YetToCompleteProcess({
  heading,
  description,
  inProcess,
  step,
}: ProcessInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full flex justify-center items-center text-[#fff] text-[22px] font-medium"
          style={{
            background:
              "linear-gradient(166deg, rgba(255, 255, 255, 0.10) 44.29%, rgba(153, 153, 153, 0.00) 130.44%)",
          }}
        >
          {step}
        </div>
      </div>
      <ProcessInfo
        heading={heading}
        description={description}
        inProcess={inProcess}
      />
    </div>
  );
}

function DeployProgress({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="w-[358px] mb-6">
        <h3 className="text-[#F1F1FF] text-[22px] font-medium">
          You're almost done.
        </h3>
        <p className="text-[#F1F1FF99] text-[14px]">
          Please follow the steps to configure your Project and deploy it.
        </p>
      </div>
      <div className="flex flex-col w-max">{children}</div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse w-full h-[16px] bg-[#85858521] rounded-md"></div>
  );
}

interface GitRepoCardProps {
  selectedRepo: string;
  selectedBranch: string;
}

function GitRepoCard({ selectedRepo, selectedBranch }: GitRepoCardProps) {
  return (
    <div className="mb-5 flex items-center justify-between bg-[#853BCE1A] border border-[#853BCE] rounded-lg py-[12px] px-[19px]">
      <div className="flex gap-2 items-center">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="28.5"
            fill="#63497D"
            fill-opacity="0.22"
          />
          <rect
            x="0.5"
            y="0.5"
            width="57"
            height="57"
            rx="28.5"
            stroke="#853BCE"
          />
          <path
            d="M29 11.5C26.6362 11.5 24.2956 11.9639 22.1117 12.8652C19.9278 13.7665 17.9435 15.0875 16.2721 16.7529C12.8964 20.1163 11 24.678 11 29.4345C11 37.3615 16.166 44.0869 23.312 46.4722C24.212 46.6157 24.5 46.0597 24.5 45.5755V42.5446C19.514 43.6206 18.452 40.1413 18.452 40.1413C17.624 38.061 16.454 37.505 16.454 37.505C14.816 36.393 16.58 36.4289 16.58 36.4289C18.38 36.5545 19.334 38.2762 19.334 38.2762C20.9 41.0022 23.546 40.1952 24.572 39.7647C24.734 38.599 25.202 37.8099 25.706 37.3615C21.71 36.9131 17.516 35.3708 17.516 28.5377C17.516 26.547 18.2 24.9509 19.37 23.6775C19.19 23.2291 18.56 21.364 19.55 18.9428C19.55 18.9428 21.062 18.4586 24.5 20.7721C25.922 20.3776 27.47 20.1803 29 20.1803C30.53 20.1803 32.078 20.3776 33.5 20.7721C36.938 18.4586 38.45 18.9428 38.45 18.9428C39.44 21.364 38.81 23.2291 38.63 23.6775C39.8 24.9509 40.484 26.547 40.484 28.5377C40.484 35.3887 36.272 36.8952 32.258 37.3436C32.906 37.8995 33.5 38.9935 33.5 40.6615V45.5755C33.5 46.0597 33.788 46.6336 34.706 46.4722C41.852 44.069 47 37.3615 47 29.4345C47 27.0793 46.5344 24.7472 45.6298 22.5712C44.7252 20.3953 43.3994 18.4183 41.7279 16.7529C40.0565 15.0875 38.0722 13.7665 35.8883 12.8652C33.7044 11.9639 31.3638 11.5 29 11.5Z"
            fill="#853BCE"
          />
        </svg>
        <div className="flex flex-col">
          <span className="text-[#C4C4C4A8] text-[12px] inline-block">
            Git repository
          </span>
          {selectedRepo === "" ? (
            <Skeleton />
          ) : (
            <span className="text-[#fff] inline-block">{selectedRepo}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[#C4C4C4A8] text-[12px] inline-block">
          Deploying
        </span>
        <span className="text-[#fff] flex items-center gap-1">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4956_20048)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.85938 1.42188V0.8125H2.64062V1.42188V7.38929C1.58931 7.65988 0.8125 8.61421 0.8125 9.75C0.8125 11.0962 1.90381 12.1875 3.25 12.1875C4.40416 12.1875 5.37097 11.3853 5.62331 10.3081C6.80145 10.1459 7.90254 9.60351 8.75306 8.75306C9.60351 7.90254 10.1459 6.80145 10.3081 5.62331C11.3853 5.37097 12.1875 4.40416 12.1875 3.25C12.1875 1.90381 11.0962 0.8125 9.75 0.8125C8.40377 0.8125 7.3125 1.90381 7.3125 3.25C7.3125 4.36369 8.05938 5.30292 9.07961 5.59414C8.93173 6.45859 8.51963 7.26286 7.89125 7.89125C7.26286 8.51963 6.45859 8.93173 5.59414 9.07961C5.35794 8.25216 4.69546 7.60449 3.85938 7.38929V1.42188ZM10.9688 3.25C10.9688 3.9231 10.4231 4.46875 9.75 4.46875C9.07693 4.46875 8.53125 3.9231 8.53125 3.25C8.53125 2.5769 9.07693 2.03125 9.75 2.03125C10.4231 2.03125 10.9688 2.5769 10.9688 3.25ZM3.25 10.9688C3.9231 10.9688 4.46875 10.4231 4.46875 9.75C4.46875 9.07693 3.9231 8.53125 3.25 8.53125C2.5769 8.53125 2.03125 9.07693 2.03125 9.75C2.03125 10.4231 2.5769 10.9688 3.25 10.9688Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_4956_20048">
                <rect width="13" height="13" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {selectedRepo === "" ? (
            <Skeleton />
          ) : (
            <span className="text-[#fff] inline-block">{selectedBranch}</span>
          )}
        </span>
      </div>
    </div>
  );
}

export {
  Dots,
  CompletedProcess,
  CurrentProcess,
  YetToCompleteProcess,
  DeployProgress,
  GitRepoCard,
};
