import { useState } from "react";

function Label({
  id,
  label,
  children,
  htmlFor,
  // optional,
  className,
  requiredInput,
  toolTipContent,
}: LabelProps) {
  const [toolTipHover, setToolTipHover] = useState(false);

  window.addEventListener("dblclick", () => {
    if (toolTipHover) {
      setToolTipHover(!toolTipHover);
    }
  });

  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={`${className} text-[#FFFFFF80] text-md font-['Poppins'] mb-3 leading-2 font-medium text-skin-primary flex justify-between`}
    >
      <div className="flex gap-1">
        {label ? <span>{label}</span> : children}
        {requiredInput && (
          <span className="py-1">
            <svg
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.02273 6.54545L3.10227 4.35795L1.25284 5.53125L0.775568 4.69602L2.72443 3.68182L0.775568 2.66761L1.25284 1.83239L3.10227 3.00568L3.02273 0.818182H3.97727L3.89773 3.00568L5.74716 1.83239L6.22443 2.66761L4.27557 3.68182L6.22443 4.69602L5.74716 5.53125L3.89773 4.35795L3.97727 6.54545H3.02273Z"
                fill="#D63928"
              />
            </svg>
          </span>
        )}
      </div>
      <span
        className="relative mt-[6px]"
        onMouseEnter={() => setToolTipHover(true)}
        onMouseLeave={() => setToolTipHover(false)}
        onClick={() => {
          setToolTipHover(!toolTipHover);
        }}
      >
        {toolTipContent && (
          <span className="py-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 8.5C5.58579 8.5 5.25 8.83579 5.25 9.25C5.25 9.66421 5.58579 10 6 10C6.41421 10 6.75 9.66421 6.75 9.25C6.75 8.83579 6.41421 8.5 6 8.5ZM6 2.5C4.89543 2.5 4 3.39543 4 4.5C4 4.77614 4.22386 5 4.5 5C4.77614 5 5 4.77614 5 4.5C5 3.94772 5.44772 3.5 6 3.5C6.55228 3.5 7 3.94772 7 4.5C7 4.87058 6.91743 5.07932 6.63398 5.39755L6.51804 5.52255L6.25395 5.79209C5.71178 6.36031 5.5 6.76947 5.5 7.5C5.5 7.77614 5.72386 8 6 8C6.27614 8 6.5 7.77614 6.5 7.5C6.5 7.12942 6.58257 6.92068 6.86602 6.60245L6.98196 6.47745L7.24605 6.20791C7.78822 5.63969 8 5.23053 8 4.5C8 3.39543 7.10457 2.5 6 2.5Z"
                fill="white"
              />
            </svg>
          </span>
        )}
        {toolTipHover && (
          <span className="bg-[#1B2025] text-[#FFFFFFCC] z-50 inline-block absolute shadow-md w-[250px] text-[12px] rounded-lg font-normal px-3 py-2 right-5 md:left-5 bottom-[-10px]">
            {toolTipContent}
          </span>
        )}
      </span>
    </label>
  );
}

export default Label;

interface LabelProps {
  id?: string;
  label?: string;
  children?: React.ReactNode;
  htmlFor?: string;
  // optional?: boolean;
  requiredInput?: boolean;
  toolTipContent?: string;
  className?: string;
}
