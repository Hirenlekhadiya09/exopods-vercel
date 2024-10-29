import { Link } from "react-router-dom";
import { useState } from "react";
import useUserCredits from "pages/contexts/useUserCredits";

const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <h2 className="animate-spin">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
        </svg>
      </h2>
    </div>
  );
}

type CreditsProps = {
  className?: string;
};

function Credits({ className }: CreditsProps) {
  const [showAddCredit, setShowAddCredit] = useState(false);
  const { credits, isCreditsLoading, setIsCreditsLoading } = useUserCredits();
  const accessToken = window.localStorage.getItem("access_token");

  const handleClick = () => {
    setIsCreditsLoading(true);
    const apiUrl = `${exoApiUrl}user/create-stripe-checkout-session`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div
      className={`
		cursor-pointer bg-[#08A59321] flex gap-2 items-center px-3 relative
		${className ? className : "py-2 rounded-[5px]"}`}
      onClick={() => setShowAddCredit(!showAddCredit)}
    >
      <div className="text-[#fff] text-[14px] font-medium">Credits:</div>
      <div className="text-[#19FB9B] text-[14px] font-medium">
        {isCreditsLoading ? <Loader /> : `${credits} USD`}
      </div>
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 5.98989C5.5 5.85728 5.55268 5.73011 5.64645 5.63634C5.74021 5.54257 5.86739 5.48989 6 5.48989C6.13261 5.48989 6.25979 5.54257 6.35355 5.63634C6.44732 5.73011 6.5 5.85728 6.5 5.98989V8.98989C6.5 9.1225 6.44732 9.24968 6.35355 9.34344C6.25979 9.43721 6.13261 9.48989 6 9.48989C5.86739 9.48989 5.74021 9.43721 5.64645 9.34344C5.55268 9.24968 5.5 9.1225 5.5 8.98989V5.98989ZM6 3.52539C5.86739 3.52539 5.74021 3.57807 5.64645 3.67184C5.55268 3.76561 5.5 3.89278 5.5 4.02539C5.5 4.158 5.55268 4.28518 5.64645 4.37894C5.74021 4.47271 5.86739 4.52539 6 4.52539C6.13261 4.52539 6.25979 4.47271 6.35355 4.37894C6.44732 4.28518 6.5 4.158 6.5 4.02539C6.5 3.89278 6.44732 3.76561 6.35355 3.67184C6.25979 3.57807 6.13261 3.52539 6 3.52539Z"
          fill="#F8F8F8"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 1.5C3.2385 1.5 1 3.7385 1 6.5C1 9.2615 3.2385 11.5 6 11.5C8.7615 11.5 11 9.2615 11 6.5C11 3.7385 8.7615 1.5 6 1.5ZM2 6.5C2 7.56087 2.42143 8.57828 3.17157 9.32843C3.92172 10.0786 4.93913 10.5 6 10.5C7.06087 10.5 8.07828 10.0786 8.82843 9.32843C9.57857 8.57828 10 7.56087 10 6.5C10 5.43913 9.57857 4.42172 8.82843 3.67157C8.07828 2.92143 7.06087 2.5 6 2.5C4.93913 2.5 3.92172 2.92143 3.17157 3.67157C2.42143 4.42172 2 5.43913 2 6.5Z"
          fill="#F8F8F8"
        />
      </svg>
      {showAddCredit && (
        <>
          <div className="fixed w-screen h-screen bg-transparent top-0 left-0"></div>
          <div
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName == "DIV") {
                e.stopPropagation();
              }
              setShowAddCredit(true);
            }}
            className="cursor-default shadow-lg absolute flex flex-col items-center gap-2 w-[280px] bg-[#24292f] p-6 rounded-[9px] border border-[#66708559] -translate-x-1/2 top-[110%] left-1/2"
          >
            <div className="flex gap-2 items-center">
              <div className="text-[#fff] text-[18px] font-medium">
                Credits:
              </div>
              <div className="text-[#19FB9B] text-[18px] font-medium">
                {isCreditsLoading ? <Loader /> : `${credits} USD`}
              </div>
            </div>
            <p className="font-normal text-[#FFFFFF99] text-[12px] text-center">
              Add credits to keep your pods running.
            </p>
            <button
              role="link"
              className="w-[80%] text-sm font-medium bg-[#08A593] text-[#fff] px-[10px] py-[6px] rounded-[6px] mt-4 mb-2"
              onClick={handleClick}
            >
              Add Credit
            </button>
            <Link
              to="https://discord.gg/dhHZAvMvvB"
              target="_blank"
              className="text-[#0070F3] text-xs"
            >
              Contact Support
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Credits;
