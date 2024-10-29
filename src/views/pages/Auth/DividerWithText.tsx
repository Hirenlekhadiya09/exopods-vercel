export default function DividerWithText() {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-t-[#808080]"></span>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#000] text-[#808080] px-2 text-muted-foreground">
          OR
        </span>
      </div>
    </div>
  );
}
