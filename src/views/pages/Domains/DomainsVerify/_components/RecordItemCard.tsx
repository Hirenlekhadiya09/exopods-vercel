import Copy from "./Copy";

interface RecordItemCardProps {
  dKey: string;
  value: string;
  type: string;
}

export default function RecordItemCard({
  dKey,
  value,
  type,
}: RecordItemCardProps) {
  return (
    <div className="bg-[#24292F9E] w-full rounded-lg p-[15px] max-w-[480px]">
      <span className="text-[#fff] mb-3 inline-block text-sm fsm:text-base">
        Record
      </span>
      <div className="flex flex-col gap-4">
        <div className="relative border border-[#FFFFFF36] rounded-[10px] p-2 text-xs fsm:text-sm">
          <span className="text-[#08A593] mr-3">Key:</span>
          <span className="text-[#ffffffcc] break-all mr-8 inline-block">
            {dKey}
          </span>
          <Copy type="card" />
        </div>
        <div className="relative border border-[#FFFFFF36] rounded-[10px] p-2 text-xs fsm:text-sm">
          <span className="text-[#08A593] mr-3">Value:</span>
          <span className="text-[#ffffffcc] break-all mr-8 inline-block">
            {value}
          </span>
          <Copy type="card" />
        </div>
        <div className="relative  border border-[#FFFFFF36] rounded-[10px] p-2 text-xs fsm:text-sm">
          <span className="text-[#08A593] mr-3">Type:</span>
          <span className="text-[#ffffffcc] break-all mr-8 inline-block">
            {type}
          </span>
          {/* <Copy type="card" /> */}
        </div>
      </div>
    </div>
  );
}
