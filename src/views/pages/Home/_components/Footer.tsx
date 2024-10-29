import { Link } from "react-router-dom";
import exoLogo from "assets/images/logo.png";

export default function Footer() {
  return (
    <div className="px-[5%]">
      <div className="border-t-[1px] border-solid border-[#2E2929] py-12 flex justify-between items-center gap-6 flex-col fsm:flex-row">
        <div className="hidden fsm:flex">
          <img className="h-[43px] w-auto" src={exoLogo} alt="logo" />
        </div>
        <span className="text-[#fff]">hello@exopods.com</span>
        <div className="flex gap-4 items-center">
          <Link to="https://www.linkedin.com/company/exopods/" target="_blank">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.6 4.924H0.201V15.137H3.601L3.6 4.924ZM3.824 1.764C3.802 0.763 3.086 0 1.924 0C0.76 0 0 0.763 0 1.764C0 2.744 0.738 3.53 1.879 3.53H1.901C3.086 3.53 3.824 2.745 3.824 1.764ZM15.86 9.28C15.86 6.144 14.183 4.684 11.946 4.684C10.141 4.684 9.333 5.674 8.882 6.37V4.924H5.482C5.527 5.882 5.482 15.137 5.482 15.137H8.882V9.433C8.882 9.128 8.904 8.823 8.994 8.605C9.24 7.995 9.799 7.364 10.738 7.364C11.968 7.364 12.461 8.3 12.461 9.673V15.137H15.86V9.28Z"
                fill="white"
              />
            </svg>
          </Link>
          <Link to="https://www.facebook.com/helloexopods/" target="_blank">
            <svg
              width="11"
              height="22"
              viewBox="0 0 11 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.28 12.282L10.85 8.33H7.283V5.767C7.283 4.686 7.78 3.631 9.378 3.631H11V0.267C11 0.267 9.528 0 8.122 0C5.184 0 3.265 1.893 3.265 5.318V8.33H0V12.282H3.265V21.834C4.5951 22.0564 5.9529 22.0564 7.283 21.834V12.282H10.279H10.28Z"
                fill="white"
              />
            </svg>
          </Link>
          <Link to="https://x.com/helloexopods" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 
            4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
                fill="white"
              />
            </svg>
          </Link>
          <Link to="https://www.instagram.com/helloexopods/" target="_blank">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.09 0H14.91C18.27 0 21 2.73 21 6.09V14.91C21 16.5252 20.3584 18.0742 19.2163 19.2163C18.0742 20.3584 16.5252 21 14.91 21H6.09C2.73 21 0 18.27 0 14.91V6.09C0 4.47483 0.641623 2.92582 1.78372 1.78372C2.92582 0.641623 4.47483 0 6.09 0ZM5.88 2.1C4.87748 2.1 3.91602 2.49825 3.20714 3.20714C2.49825 3.91602 2.1 4.87748 2.1 5.88V15.12C2.1 17.2095 3.7905 18.9 5.88 18.9H15.12C16.1225 18.9 17.084 18.5018 17.7929 17.7929C18.5018 17.084 18.9 16.1225 18.9 15.12V5.88C18.9 3.7905 17.2095 2.1 15.12 2.1H5.88ZM16.0125 3.675C16.3606 3.675 16.6944 3.81328 16.9406 4.05942C17.1867 4.30556 17.325 4.6394 17.325 4.9875C17.325 5.3356 17.1867 5.66944 16.9406 5.91558C16.6944 6.16172 16.3606 6.3 16.0125 6.3C15.6644 6.3 15.3306 6.16172 15.0844 5.91558C14.8383 5.66944 14.7 5.3356 14.7 4.9875C14.7 4.6394 14.8383 4.30556 15.0844 4.05942C15.3306 3.81328 15.6644 3.675 16.0125 3.675ZM10.5 5.25C11.8924 5.25 13.2277 5.80312 14.2123 6.78769C15.1969 7.77225 15.75 9.10761 15.75 10.5C15.75 11.8924 15.1969 13.2277 14.2123 14.2123C13.2277 15.1969 11.8924 15.75 10.5 15.75C9.10761 15.75 7.77225 15.1969 6.78769 14.2123C5.80312 13.2277 5.25 11.8924 5.25 10.5C5.25 9.10761 5.80312 7.77225 6.78769 6.78769C7.77225 5.80312 9.10761 5.25 10.5 5.25ZM10.5 7.35C9.66457 7.35 8.86335 7.68187 8.27261 8.27261C7.68187 8.86335 7.35 9.66457 7.35 10.5C7.35 11.3354 7.68187 12.1366 8.27261 12.7274C8.86335 13.3181 9.66457 13.65 10.5 13.65C11.3354 13.65 12.1366 13.3181 12.7274 12.7274C13.3181 12.1366 13.65 11.3354 13.65 10.5C13.65 9.66457 13.3181 8.86335 12.7274 8.27261C12.1366 7.68187 11.3354 7.35 10.5 7.35Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-start pb-[30px] text-xs fsm:text-base">
        <span className="text-[#ffffff70]">© 2024 Exopods, Inc.</span>
        <div className="flex items-center gap-4 ml-auto">
          <Link
            to="/terms-of-service"
            className="text-[#ffffff70] hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy-policy"
            className="text-[#ffffff70] hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
