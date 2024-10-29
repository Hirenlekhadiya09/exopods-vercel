import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabaseClient } from "config/supabaseClient";
import useAuth from "context/AuthContext/useAuth";
import { useEmailConfirmationToast } from "pages/contexts/emailConfirmationToastContext";
import TermsAndPrivacyNotice from "./TermsAndPrivacyNotice";
import DividerWithText from "./DividerWithText";
import OAuthSignIn from "./OAuthSignIn";

export default function SignIn() {
  const { confirmationToast, setConfirmationToast } =
    useEmailConfirmationToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmationToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate("/services");
    }
  };

  if (session) return <Navigate to="/services" />;

  return (
    <div className="flex justify-center items-center shadow-2xl min-h-screen py-16 bg-[#030303]">
      {confirmationToast && (
        <div
          className={`text-center flex items-center gap-3 fixed top-4 left-1/2 transform -translate-x-1/2 px-3 py-2 shadow-lg bg-[#fff] rounded-[3px] text-[#000] font-semibold text-[12px]`}
        >
          A verification link has been sent to your email, Please verify to Sign
          In.
        </div>
      )}
      <div className="max-w-[90vw] w-[420px] bg-[#000] border border-[#BBBBBB38] rounded-[10px] p-[50px]">
        <div>
          <svg
            width="59"
            height="46"
            viewBox="0 0 59 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.8518 0.830779C26.828 -0.219486 28.474 -0.282406 29.5281 0.690239L32.1236 3.08503C38.3855 8.86275 38.7606 18.604 32.9616 24.8428C30.6578 27.3212 26.7736 27.4697 24.286 25.1745L23.9542 24.8682C17.8756 19.2597 17.5114 9.80348 23.1407 3.74734L25.8518 0.830779Z"
              fill="white"
            />
            <path
              d="M0.101128 26.7098C0.135932 25.2787 1.32853 24.1468 2.76488 24.1814L6.30137 24.2668C14.8336 24.4728 21.5826 31.5309 21.376 40.0316C21.2938 43.4086 18.4795 46.0799 15.09 45.9981L14.6378 45.9871C6.35536 45.7872 -0.19618 38.9357 0.00448941 30.6838L0.101128 26.7098Z"
              fill="white"
            />
            <path
              d="M56.2278 24.4159C57.6643 24.4384 58.8107 25.6169 58.7882 27.0482L58.7326 30.5722C58.5986 39.0744 51.5721 45.8586 43.0383 45.725C39.6483 45.672 36.9432 42.8908 36.9965 39.5133L37.0036 39.0626C37.1337 30.8093 43.9545 24.2239 52.2383 24.3534L56.2278 24.4159Z"
              fill="white"
            />
          </svg>
        </div>
        <h2 className="text-[22px] text-[#fff] mt-3">Sign In</h2>
        <div>
          <span className="text-[#898989] text-sm">Don't have an account?</span>{" "}
          <Link className="text-[#1A73E8] text-sm" to="/signup">
            Sign Up
          </Link>
        </div>
        <form className="mt-7" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#C4C4C4A8] text-sm">
              Email
            </label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="dev@exopods.com"
              autoComplete="email"
              className="bg-transparent border border-[#dddbdb1f] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none rounded-md px-3 py-2 placeholder:text-[#888585] text-[#e2dfdf] text-[14px]"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="text-[#C4C4C4A8] text-sm">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=""
              className="bg-transparent border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none rounded-md px-3 py-2 placeholder:text-[#888585] text-[#e2dfdf] text-[14px]"
            />
          </div>
          {error !== "" && (
            <span className="mt-3 text-red-600 text-[12px]">{error}</span>
          )}
          <button
            type="submit"
            className="mt-8 bg-[#DEDEDE] rounded-md w-full px-3 py-2 text-[#000] font-medium"
          >
            Sign In
          </button>
        </form>
        <DividerWithText />
        <OAuthSignIn setError={setError} />
        <TermsAndPrivacyNotice />
      </div>
    </div>
  );
}
