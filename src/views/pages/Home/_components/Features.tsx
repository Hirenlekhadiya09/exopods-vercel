import SectionHeading from "./SectionHeading";

function BorderGradient() {
  return (
    <>
      <div className="absolute z-[50] top-[-0.5px] right-0">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoBorderOne.png"
          alt=""
          className="h-[0.5px] w-[80%]"
        />
      </div>
      <div className="absolute z-[50] bottom-[-0.5px] left-[20%]">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/pseudoBorderOne.png"
          alt=""
          className="h-[0.5px] w-[80%]"
        />
      </div>
    </>
  );
}

interface FeatureSmBoxProps {
  src: string;
  heading: string;
  description: string;
}

function FeatureSmBox({ src, heading, description }: FeatureSmBoxProps) {
  return (
    <div className="rounded-[10px] border border-[#ffffff35] p-[17px] bg-[#161a1e] relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-[10px] border border-[#AA86E3] p-3 bg-[#0c1015] bg-opacity-[0.15]">
          <img src={src} alt="feature image" className="w-9 h-9" />
        </div>
        <h4 className="text-base font-medium max-w-[270px]">{heading}</h4>
      </div>
      <p className="text-[14px] text-[#8B949E]">{description}</p>
      <BorderGradient />
    </div>
  );
}

export default function Features() {
  return (
    <div className="px-[5%]">
      <SectionHeading
        name="Features"
        heading="The tools you need to build what you want."
        description="Exopods has all the key features you need to launch your apps with
        ease."
        className="mt-[-70px] fsm:mt-0"
      />
      <div className="text-[#fff] flex mt-[150px] justify-center gap-6 flex-wrap">
        <div className="max-w-[620px] p-12 flex flex-col gap-10 justify-between items-center rounded-[10px] border-[1px] border-[#ffffff35] relative">
          <div className="max-w-[400px]">
            <img
              src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/dockerImg.png"
              alt="docker image"
            />
          </div>
          <div>
            <h3 className="text-[32px] font-medium">Public Templates</h3>
            <p className="text-[#8B949E] mt-5">
              We have created 1000s of curated docker templates, so that you can
              deploy your apps with just one click. Our dynamic templates allows
              you to customize the setting in realtime
            </p>
          </div>
          <BorderGradient />
        </div>
        <div className="max-w-full fsm:max-w-[380px] flex flex-col gap-6">
          <FeatureSmBox
            src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/globeImg.png"
            heading="Get your public url in seconds"
            description="For each app deployed on Exopods, we provide a unique endpoint,
            you can get access to your apps in seconds."
          />
          <FeatureSmBox
            src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/containerImg.png"
            heading="Pull from public & private container registry"
            description="Exopods allows you to pull from any available docker registry to
            support wide range of use cases."
          />
          <FeatureSmBox
            src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/domainImg.png"
            heading="Bring your own domain"
            description="Personalize your endpoint with your own unique domain."
          />
        </div>
      </div>
    </div>
  );
}
