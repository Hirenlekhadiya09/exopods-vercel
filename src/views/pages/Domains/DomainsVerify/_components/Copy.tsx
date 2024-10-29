import { useState } from "react";

export default function Copy({ type }: { type: string }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCopyClick(e: any) {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
    let text = "";
    if (type === "tr") {
      text =
        e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
    } else if (type == "card") {
      text = e.target.parentNode.parentNode.parentNode.children[1].innerText;
    }
    navigator.clipboard.writeText(text);
  }
  return (
    <div className="absolute top-0 right-2 h-full w-8 flex items-center justify-center">
      <button onClick={(e) => handleCopyClick(e)} className="relative">
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.33203 3.16767V1.82017C4.33211 1.60262 4.41858 1.39401 4.57244 1.2402C4.7263 1.0864 4.93494 1 5.15249 1H12.2616C12.4792 1 12.6879 1.08644 12.8417 1.24031C12.9956 1.39417 13.082 1.60286 13.082 1.82046V8.92983C13.082 9.14738 12.9955 9.35599 12.8416 9.5098C12.6878 9.6636 12.4791 9.75 12.2616 9.75H10.8995"
            stroke="white"
            stroke-opacity="0.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.92983 3.33325H2.81987C2.60238 3.33341 2.39384 3.41992 2.2401 3.57376C2.08636 3.72761 2 3.93621 2 4.15371V11.2628C2 11.4804 2.08644 11.6891 2.24031 11.8429C2.39417 11.9968 2.60286 12.0833 2.82046 12.0833H9.92983C10.1474 12.0832 10.356 11.9967 10.5098 11.8428C10.6636 11.689 10.75 11.4803 10.75 11.2628V4.154C10.75 4.04623 10.7288 3.93951 10.6876 3.83994C10.6464 3.74036 10.586 3.64988 10.5098 3.57366C10.4336 3.49744 10.3431 3.43698 10.2436 3.39573C10.144 3.35448 10.0376 3.33325 9.92983 3.33325Z"
            stroke="white"
            stroke-opacity="0.6"
            stroke-linejoin="round"
          />
        </svg>
        <div
          className={`shadow-2xl border-none absolute -top-[10px] left-[50%] whitespace-nowrap z-10 text-xs delay-300 bg-gray-700 border text-white-600 w-auto px-2 py-1.5 rounded h-fit -translate-y-full -translate-x-2/4
                ${isOpen ? "" : "hidden"} `}
        >
          Copied
        </div>
      </button>
    </div>
  );
}
