import React, { forwardRef, useState } from "react";
import Label from "./Label";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    name,
    className,
    placeholder,
    variant = "primary",
    kind = "outline",
    disabled = false,
    label,
    labelPosition = "top",
    icon,
    iconPosition = "right",
    type = "text",
    autoComplete,
    defaultValue,
    requiredInput,
    required = false,
    toolTipContent,
    helperText,
    value,
    onChange,
    iconLeft,
    iconRight,
    autofocus,
    // optional,
    ariaLabel,
    as = "input",
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const Tag = `${as}` as React.ElementType;

    return (
      <div className="form-group relative">
        {label && (
          <Label
            label={label}
            // optional={optional}
            requiredInput={requiredInput}
            toolTipContent={toolTipContent}
            htmlFor={name}
          />
        )}

        <div className="relative">
          <Tag
            id={id}
            name={name}
            type={showPassword ? "text" : type}
            required={required}
            autoComplete={autoComplete}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            className={`
                            border border-[#ffffff80] bg-transparent text-[#dfdfdf] px-5 rounded-lg
                            ${className ? className : "py-4 w-full"} 
                        `.trim()}
            disabled={disabled}
            aria-label={ariaLabel}
            autoFocus={autofocus}
            {...props}
          />

          {/* Render the eye icon */}
          {type === "password" && (
            <div
              className="absolute z-10 right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="11"
                  viewBox="0 0 21 11"
                  fill="none"
                >
                  <path
                    d="M1.47907 7.1726C2.36172 3.75354 6.05152 1.32418 10.2021 1.32418C14.3513 1.32418 18.0411 3.75354 18.9251 7.1726C18.9601 7.30827 19.0605 7.42717 19.2041 7.50313C19.3478 7.5791 19.523 7.60591 19.6912 7.57767C19.8594 7.54943 20.0068 7.46845 20.101 7.35254C20.1952 7.23664 20.2284 7.0953 20.1934 6.95963C19.1878 3.07077 14.9816 0.280196 10.2021 0.280196C5.42253 0.280196 1.21634 3.07077 0.21074 6.95963C0.175729 7.0953 0.208965 7.23664 0.303138 7.35254C0.39731 7.46845 0.544704 7.54943 0.712895 7.57767C0.881085 7.60591 1.0563 7.5791 1.19998 7.50313C1.34367 7.42717 1.44406 7.30827 1.47907 7.1726ZM10.1891 3.41216C11.3905 3.41216 12.5426 3.79713 13.3921 4.48238C14.2416 5.16763 14.7189 6.09702 14.7189 7.06611C14.7189 8.0352 14.2416 8.9646 13.3921 9.64985C12.5426 10.3351 11.3905 10.7201 10.1891 10.7201C8.98776 10.7201 7.8356 10.3351 6.98611 9.64985C6.13661 8.9646 5.65937 8.0352 5.65937 7.06611C5.65937 6.09702 6.13661 5.16763 6.98611 4.48238C7.8356 3.79713 8.98776 3.41216 10.1891 3.41216Z"
                    fill="#D7D7D7"
                  />
                </svg>
              )}
              {!showPassword && (
                <svg
                  width="29"
                  height="22"
                  viewBox="0 0 29 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.13826 2.3606C4.07086 2.30947 3.99083 2.2689 3.90276 2.24123C3.81469 2.21355 3.72029 2.19931 3.62496 2.19931C3.52963 2.19931 3.43524 2.21355 3.34717 2.24123C3.2591 2.2689 3.17907 2.30947 3.11166 2.3606C3.04426 2.41174 2.99079 2.47245 2.9543 2.53926C2.91782 2.60608 2.89905 2.67769 2.89905 2.75001C2.89905 2.82232 2.91782 2.89393 2.9543 2.96075C2.99079 3.02756 3.04426 3.08827 3.11166 3.13941L8.18666 6.98721C5.67319 8.28777 3.92338 10.2777 3.30596 12.5378C3.28654 12.6085 3.28567 12.6814 3.30339 12.7524C3.32112 12.8234 3.3571 12.891 3.40927 12.9514C3.46145 13.0118 3.5288 13.0639 3.60748 13.1045C3.68616 13.1452 3.77463 13.1737 3.86784 13.1885C3.96105 13.2032 4.05717 13.2039 4.15072 13.1904C4.24426 13.177 4.3334 13.1497 4.41304 13.1101C4.49269 13.0705 4.56127 13.0194 4.61489 12.9597C4.6685 12.9 4.70609 12.8329 4.72551 12.7622C5.0023 11.7463 5.54344 10.7826 6.31727 9.92733C7.09109 9.07208 8.08205 8.34254 9.23211 7.78141L11.5275 9.52161C10.9292 9.84713 10.4315 10.2675 10.0689 10.7535C9.70621 11.2396 9.48728 11.7796 9.42729 12.3363C9.36729 12.8929 9.46765 13.4528 9.72141 13.9771C9.97518 14.5014 10.3763 14.9775 10.8968 15.3724C11.4174 15.7673 12.045 16.0716 12.7361 16.2641C13.4272 16.4566 14.1652 16.5328 14.899 16.4872C15.6328 16.4417 16.3447 16.2756 16.9854 16.0005C17.6261 15.7254 18.1802 15.3478 18.6093 14.894L24.8631 19.6394C24.9992 19.7427 25.1839 19.8007 25.3764 19.8007C25.5689 19.8007 25.7536 19.7427 25.8897 19.6394C26.0258 19.5361 26.1023 19.3961 26.1023 19.25C26.1023 19.104 26.0258 18.9639 25.8897 18.8606L4.13826 2.3606ZM14.6798 8.80331L19.5561 12.5026C19.507 11.5334 18.9775 10.6139 18.0734 9.9281C17.1694 9.24226 15.9574 8.84056 14.6798 8.80331ZM10.9185 5.95101L12.0828 6.83431C12.8722 6.67876 13.6844 6.60003 14.5 6.60001C19.1487 6.60001 23.2826 9.15971 24.273 12.7622C24.3122 12.9052 24.4247 13.0304 24.5856 13.1105C24.7466 13.1905 24.9429 13.2188 25.1314 13.189C25.3198 13.1592 25.4849 13.0739 25.5904 12.9518C25.696 12.8297 25.7332 12.6808 25.694 12.5378C24.5673 8.44031 19.8548 5.50001 14.5 5.50001C13.2602 5.50001 12.0524 5.65731 10.9185 5.95101Z"
                    fill="#D7D7D7"
                  />
                </svg>
              )}
            </div>
          )}

          {/* TODO: Make it so the user can choose either left or right */}
          {iconRight && (
            <div
              className="absolute z-10 right-3 top-1/2 -translate-y-1/2"
              dangerouslySetInnerHTML={{ __html: iconRight }}
            />
          )}

          {iconLeft && (
            <div
              className="absolute z-10 left-3 top-1/2 -translate-y-1/2"
              dangerouslySetInnerHTML={{ __html: iconLeft }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default Input;

interface InputProps {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  variant?: "primary" | "secondary";
  kind?: "outline" | "filled" | "standard";
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  labelPosition?: "top" | "right" | "bottom" | "left";
  icon?: string;
  iconPosition?: "left" | "right";
  type?: "number" | "email" | "tel" | "text" | "password";
  autoComplete?: string;
  defaultValue?: string;
  helperText?: string;
  requiredInput?: boolean;
  toolTipContent?: string;
  required?: boolean;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconRight?: any;
  iconLeft?: any;
  autofocus?: boolean;
  // optional?: boolean;
  ariaLabel?: string;
  as?: string | "textarea" | "input";
}
