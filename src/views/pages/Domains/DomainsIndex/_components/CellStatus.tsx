function CellStatus({ label, status }: { status: string; label?: string }) {
  return (
    <div className="inline-block">
      <div className="py-2 flex items-center align-center space-x-2">
        <div
          className={`inline-block h-2 w-2 rounded-full ${
            status === "Attached" ? "bg-[#12B76A]" : "bg-[#ffde00]"
          }`}
        ></div>
        <p
          className={`block capitalize font-medium text-xs leading-3 ${
            status === "Attached" ? "text-[#12B76A]" : "text-[#ffde00]"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default CellStatus;
