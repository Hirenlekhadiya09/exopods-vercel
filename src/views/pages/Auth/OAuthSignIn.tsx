import { supabaseClient } from "config/supabaseClient";
import useAuth from "context/AuthContext/useAuth";
const appUrl: string = import.meta.env.VITE_APP_URL;

interface Error {
  setError: (error: string) => void;
}

export default function OAuthSignIn({ setError }: Error) {
  const { session } = useAuth();

  const handleGitHubSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: appUrl + "/services",
      },
    });
    if (error) {
      setError(error.message);
    } else {
      dataLayerLoginEvent();
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: appUrl + "/services",
      },
    });
    if (error) {
      setError(error.message);
    } else {
      dataLayerLoginEvent();
    }
  };

  function dataLayerLoginEvent() {
    window.dataLayer.push({
      event: "login",
      provider: session?.user?.app_metadata?.provider,
      user_email: session?.user?.user_metadata?.email,
      user_id: session?.user?.id,
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => handleGitHubSignIn()}
        className="flex gap-2 justify-center items-center bg-[#FFFFFF14] rounded-md w-full px-3 py-2 text-[#fff] text-[14px]"
      >
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_6174_10774"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="21"
            height="20"
          >
            <path
              d="M20.1444 0.376953L0.699951 0.376953L0.699951 19.4246L20.1444 19.4246L20.1444 0.376953Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_6174_10774)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.3932 0.376953C5.03308 0.376953 0.699951 4.74203 0.699951 10.1422C0.699951 14.4589 3.47634 18.1129 7.32792 19.4061C7.80947 19.5033 7.98587 19.196 7.98587 18.9374C7.98587 18.7111 7.96999 17.935 7.96999 17.1266C5.27356 17.7087 4.71206 15.9625 4.71206 15.9625C4.27872 14.8308 3.63666 14.5398 3.63666 14.5398C2.75412 13.9416 3.70094 13.9416 3.70094 13.9416C4.67991 14.0063 5.1936 14.944 5.1936 14.944C6.06007 16.4313 7.4563 16.011 8.01801 15.7524C8.09817 15.1218 8.35511 14.6852 8.62793 14.4429C6.47733 14.2165 4.21464 13.3758 4.21464 9.62477C4.21464 8.55771 4.59955 7.68469 5.20948 7.00572C5.11325 6.76327 4.77614 5.76069 5.3059 4.41882C5.3059 4.41882 6.12436 4.16009 7.96979 5.4212C8.75989 5.20744 9.5747 5.09871 10.3932 5.09778C11.2117 5.09778 12.0459 5.21108 12.8164 5.4212C14.662 4.16009 15.4805 4.41882 15.4805 4.41882C16.0102 5.76069 15.673 6.76327 15.5767 7.00572C16.2027 7.68469 16.5718 8.55771 16.5718 9.62477C16.5718 13.3758 14.3091 14.2002 12.1424 14.4429C12.4956 14.75 12.8003 15.3319 12.8003 16.2535C12.8003 17.563 12.7845 18.6141 12.7845 18.9372C12.7845 19.196 12.9611 19.5033 13.4424 19.4063C17.294 18.1127 20.0704 14.4589 20.0704 10.1422C20.0862 4.74203 15.7373 0.376953 10.3932 0.376953Z"
              fill="white"
            />
          </g>
        </svg>
        Continue with GitHub
      </button>
      <button
        type="button"
        onClick={() => handleGoogleSignIn()}
        className="mt-3 flex gap-2 justify-center items-center bg-[#FFFFFF14] rounded-md w-full px-3 py-2 text-[#fff] text-[14px]"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_5960_7238"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="21"
            height="21"
          >
            <path
              d="M20.5399 0.900391L0.939941 0.900391L0.939941 20.9004L20.5399 20.9004L20.5399 0.900391Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_5960_7238)">
            <path
              d="M10.9399 9.08203L10.9399 12.9548L16.3217 12.9548C16.0854 14.2003 15.3762 15.2549 14.3126 15.964L17.5581 18.4822C19.449 16.7368 20.5399 14.1731 20.5399 11.1277C20.5399 10.4185 20.4763 9.73663 20.3581 9.08214L10.9399 9.08203Z"
              fill="#1976D2"
            />
            <path
              d="M5.33564 12.8037L4.60367 13.364L2.0127 15.3822C3.65816 18.6458 7.03066 20.9004 10.9397 20.9004C13.6396 20.9004 15.9033 20.0095 17.5579 18.4823L14.3124 15.964C13.4215 16.564 12.2851 16.9277 10.9397 16.9277C8.33974 16.9277 6.13069 15.1732 5.33973 12.8095L5.33564 12.8037Z"
              fill="#4CAF50"
            />
            <path
              d="M2.0126 6.41895C1.33081 7.76436 0.939941 9.28257 0.939941 10.9007C0.939941 12.5189 1.33081 14.0371 2.0126 15.3825C2.0126 15.3915 5.33995 12.8006 5.33995 12.8006C5.13995 12.2006 5.02173 11.5643 5.02173 10.9006C5.02173 10.2369 5.13995 9.60056 5.33995 9.00057L2.0126 6.41895Z"
              fill="#FFC107"
            />
            <path
              d="M10.9399 4.88223C12.4127 4.88223 13.7217 5.39131 14.7672 6.37315L17.6308 3.50953C15.8944 1.89137 13.6399 0.900391 10.9399 0.900391C7.03086 0.900391 3.65816 3.14585 2.0127 6.41861L5.33995 9.00044C6.13082 6.63677 8.33995 4.88223 10.9399 4.88223Z"
              fill="#FF3D00"
            />
          </g>
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
