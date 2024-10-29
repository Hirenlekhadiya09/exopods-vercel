// function CellStatus({ label, status }: { status: CellStatus; label: string }) {
// const mediaTypes: Record<CellStatus, string> = {
//   Running: "bg-[#ECFDF3] text-[#027A48]",
//   stopped: "bg-[#fccece] text-[#F02849]",
//   Terminated: "bg-[#f45b5b] text-[#F02849] bg-opacity-[0.2]",
// };
function CellStatus({ label, status }: { status: string; label?: string }) {
  // if (!label) return <></>;
  return (
    // <td className={`whitespace-nowrap px-2 py-4`}>
    <div className="inline-block">
      {/* <div className={`px-2 rounded-2xl w-full flex items-center text-center ${mediaTypes[status]}`}> */}
      <div className="py-2 flex items-center align-center space-x-2">
        <div
          className={`inline-block h-2 w-2 rounded-full ${
            status === "Running" ? "bg-[#12B76A]" : "bg-[#F02849]"
          }`}
        ></div>
        <p
          className={`block capitalize font-medium text-xs leading-3 ${
            status === "Running" ? "text-[#12B76A]" : "text-[#F02849]"
          }`}
        >
          {label}
        </p>
      </div>
      {/* </div> */}
    </div>
    // </td>
  );
}

export default CellStatus;

// type CellStatus = "Running" | "stopped" | "Terminated";
