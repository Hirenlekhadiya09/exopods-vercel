function LogItem({ text }: LogItemProps) {
  return (
    <div className="min-h-8 py-2 flex items-center border-b border-b-[#FFFFFF33]">
      <p className="font-[inconsolata] text-xs font-normal text-[#fff]">
        {text}
      </p>
    </div>
  );
}

export default LogItem;

interface LogItemProps {
  text: string;
}
