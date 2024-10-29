import SectionHeading from "./SectionHeading";

interface WorkingStepNumberProps {
  number: string;
  className?: string;
}

function WorkingStepNumber({ number, className }: WorkingStepNumberProps) {
  return (
    <span
      className={`bg-[#fff] w-[38px] h-[38px] md:w-[48px] md:h-[48px] rounded-full absolute ${
        className ? className : ""
      } left-[-19px] md:left-[-24px] flex items-center justify-center text-xl md:text-2xl font-bold`}
    >
      {number}
    </span>
  );
}

interface WorkingStepProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

function WorkingStep({ heading, children, className }: WorkingStepProps) {
  return (
    <div className={`${className ? className : ""} pr-5`}>
      <h3 className="text-[#fff] text-3xl sm:text-4xl md:text-5xl font-bold">
        {heading}
      </h3>
      <p className="text-[#E5E5E5] text-xl sm:text-[23px] md:text-[26px] leading-[35px] mt-[20px]">
        {children}
      </p>
    </div>
  );
}

export default function ExoWorking() {
  return (
    <div className="px-[8%] fsm:px-[6%] sm:px-[5%]">
      <SectionHeading
        name="Steps, How to Deploy a GitHub Project"
        heading="Deploy in 3 Simple Steps"
        description="Bring any Github Repo & deploy it in less than a minute."
        className="mt-[50px] sm:mt-[100px] md:mt-[120px] lg:mt-[150px]"
      />
      <div className="relative mt-[-70px] fsm:mt-0">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoStraight.png"
          alt="pseudo straight"
          className="w-[2px] h-[750px] fsm:h-[850px] md:h-[1050px]"
        />
        <WorkingStepNumber number="1" className="top-[180px] fsm:top-[230px]" />
        <div className="pt-[180px] fsm:pt-[230px] pl-[40px] absolute top-0 left-0">
          <WorkingStep
            className="max-w-[630px]"
            heading="Connect your Github repo"
          >
            <span className="text-[#7EE787]">Select a branch</span> to deploy.
          </WorkingStep>
          <div className="max-w-[830px] mt-[60px] md:mt-[100px]">
            <img
              src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/stepOneImg.png"
              alt="step one image"
            />
          </div>
        </div>
      </div>
      <div className="mt-[-50px] invisible md:visible">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoCurve.png"
          alt="pseudo curve"
          className="w-[10%]"
        />
      </div>
      <div className="md:pl-[10%] mt-[-80px] md:ml-[-2px]">
        <div className="relative flex">
          <img
            src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoStraight.png"
            alt="pseudo straight"
            className="w-[2px] h-[1200px] fsm:h-[1300px] xl:h-[1200px] 2xl:h-[1000px]"
          />
          <div>
            <div className="flex relative pl-[40px] mt-[50px] flex-wrap gap-5 sm:gap-20">
              <WorkingStepNumber number="2" className="top-0" />
              <WorkingStep
                className="max-w-[670px] mb-[50px]"
                heading="Configure build with advance configuration"
              >
                <span className="text-[#FBA262]">
                  Configs like environment variables,
                </span>{" "}
                arguments, and commands are right there at your fingertips.
              </WorkingStep>
              <div className="max-w-[415px]">
                <img
                  src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/stepTwoImg.png"
                  alt="step two image"
                />
              </div>
            </div>
            <div className="w-full relative pl-[40px] mt-[50px]">
              <WorkingStepNumber number="3" className="top-0" />
              <WorkingStep
                className="max-w-[670px] mb-[50px]"
                heading="Click deploy and pat yourself on the back"
              >
                <span className="text-[#C479F3]">Within 5 seconds,</span> public
                URL for your app is ready.
              </WorkingStep>
              <div className="max-w-[570px] relative overflow-hidden rounded-[10px]">
                <div className="absolute z-[20] top-0 left-0">
                  <img
                    src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/deployImg.png"
                    alt="deploy"
                  />
                </div>
                <img
                  src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/deployImg.png"
                  alt="deploy"
                />
                <div className="max-w-[570px] absolute top-[50%] left-0 z-[10] translate-y-[-50%]">
                  <img
                    src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/rocketAnimation.gif"
                    alt="rocket animation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-90px] px-[10%] ml-[-2px] invisible xl:visible">
        <div className="w-[50%]">
          <img
            src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoCurveBottom.png"
            alt="pseudo curve bottom"
          />
        </div>
      </div>
    </div>
  );
}
