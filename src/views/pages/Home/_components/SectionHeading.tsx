interface SectionHeadingProps {
  name: string;
  heading: string;
  description: string;
  className?: string;
}

export default function SectionHeading({
  name,
  heading,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col items-center px-3 ${
        className ? className : ""
      }`}
    >
      <span className="text-[18px] sm:text-[20px] text-center md:text-[28px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#12C2E9] to-[#F64F59]">
        {name}
      </span>
      <h2 className="text-[#fff] text-[40px] sm:text-[50px] md:text-[60px] my-[10px] leading-[60px] md:leading-[70px] font-bold max-w-[850px] text-center">
        {heading}
      </h2>
      <p className="text-center max-w-[520px] text-[15px] text-[#8B949E] font-normal mt-[10px]">
        {description}
      </p>
    </div>
  );
}
