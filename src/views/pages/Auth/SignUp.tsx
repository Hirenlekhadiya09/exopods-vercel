import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabaseClient } from "config/supabaseClient";
import useAuth from "context/AuthContext/useAuth";
import { useEmailConfirmationToast } from "pages/contexts/emailConfirmationToastContext";
import TermsAndPrivacyNotice from "./TermsAndPrivacyNotice";
import DividerWithText from "./DividerWithText";
import OAuthSignIn from "./OAuthSignIn";
const appUrl: string = import.meta.env.VITE_APP_URL;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState([
    { id: 1, name: "Uppercase letter", value: false },
    { id: 2, name: "Lowercase letter", value: false },
    { id: 3, name: "Number", value: false },
    { id: 4, name: "Special character (e.g. !?<>@#$%)", value: false },
    { id: 5, name: "8 characters or more", value: false },
  ]);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const { setConfirmationToast } = useEmailConfirmationToast();

  if (session) return <Navigate to="/services" />;

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    isValidPassword(e.target.value);
  }

  function isValidPassword(password: string) {
    const uppercaseRegex = /^(?=.*[A-Z]).*$/;
    const lowercaseRegex = /^(?=.*[a-z]).*$/;
    const numberRegex = /^(?=.*\d).*$/;
    const specialCharacterRegex =
      /^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*$/;
    const minLengthRegex = /^.{8,}$/;
    const passwordCheckArray = [
      { id: 1, name: "Uppercase letter", value: uppercaseRegex.test(password) },
      { id: 2, name: "Lowercase letter", value: lowercaseRegex.test(password) },
      { id: 3, name: "Number", value: numberRegex.test(password) },
      {
        id: 4,
        name: "Special character (e.g. !?<>@#$%)",
        value: specialCharacterRegex.test(password),
      },
      {
        id: 5,
        name: "8 characters or more",
        value: minLengthRegex.test(password),
      },
    ];
    setPasswordCheck(passwordCheckArray);
    return passwordCheckArray;
  }

  function isValidPasswordSuccess(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/;
    return passwordRegex.test(password);
  }

  const signUpNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter your email address.");
    } else if (!isValidEmail(email)) {
      setError("Invalid email address");
    } else if (password === "") {
      setError("Please enter a password.");
    } else if (!isValidPasswordSuccess(password)) {
      setError("Invalid Password Format.");
    } else if (password === confirmPassword) {
      const { error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: appUrl + "/signin",
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setConfirmationToast(true);
        navigate("/signin");
        dataLayerSignupEvent();
      }
    } else {
      setError("Passwords do not match. Please try again.");
    }
  };

  function dataLayerSignupEvent() {
    window.dataLayer.push({
      event: "signup",
      provider: session?.user?.app_metadata?.provider,
      user_email: session?.user?.user_metadata?.email,
      user_id: session?.user?.id,
    });
  }

  return (
    <div className="flex justify-center items-center shadow-2xl min-h-screen py-16 bg-[#030303]">
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
        <h2 className="text-[22px] text-[#fff] mt-3">SignUp</h2>
        <div>
          <span className="text-[#898989] text-sm">
            Already have an account?
          </span>{" "}
          <Link className="text-[#1A73E8] text-sm" to="/signin">
            Sign In
          </Link>
        </div>
        <form className="mt-7" onSubmit={signUpNewUser}>
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
              onChange={(e) => handlePasswordChange(e)}
              onClick={() => setShowPasswordRequirements(true)}
              type="password"
              placeholder=""
              className="bg-transparent border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none rounded-md px-3 py-2 placeholder:text-[#888585] text-[#e2dfdf] text-[14px]"
            />
            {showPasswordRequirements && (
              <ul className="mt-2">
                {passwordCheck.map((checkType) => (
                  <li key={checkType.id}>
                    <div className="flex gap-3 items-center my-1">
                      {checkType.value ? (
                        <div>
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.5 13C2.91005 13 0 10.0899 0 6.5C0 2.91005 2.91005 0 6.5 0C10.0899 0 13 2.91005 13 6.5C13 10.0899 10.0899 13 6.5 13ZM5.85195 9.1L10.4474 4.50385L9.529 3.58475L5.85195 7.2618L4.0131 5.42295L3.094 6.34205L5.85195 9.1Z"
                              fill="#BBBBBB"
                              fill-opacity="0.56"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-[13px] h-[13px] border border-[#BBBBBB8F] rounded-full"></div>
                      )}
                      <span className="text-[#888585] text-[12px]">
                        {checkType.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="confirm-password"
              className="text-[#C4C4C4A8] text-sm"
            >
              Confirm Password
            </label>
            <input
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </button>
        </form>
        <DividerWithText />
        <OAuthSignIn setError={setError} />
        <TermsAndPrivacyNotice />
      </div>
    </div>
  );
}
