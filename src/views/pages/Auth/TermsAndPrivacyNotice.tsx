import { Link } from "react-router-dom";

export default function TermsAndPrivacyNotice() {
  return (
    <div className="text-center mt-6">
      <span className="text-[12px] text-[#898989] leading-12 inline-block">
        By using Exopods, you agree to our{" "}
        <Link to={"/terms-of-service"} className="underline">
          Terms Of Service
        </Link>{" "}
        and{" "}
        <Link to={"/privacy-policy"} className="underline">
          Privacy Policy
        </Link>
        .
      </span>
    </div>
  );
}
