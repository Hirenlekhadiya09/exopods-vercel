import Copy from "./Copy";

interface RecordItemTRProps {
  dKey: string;
  value: string;
  type: string;
}

export default function RecordItemTR({ dKey, value, type }: RecordItemTRProps) {
  // const reverseKey = dKey.split("").reverse();

  // const dotsArr: number[] = [];

  // for (const [index, char] of reverseKey.entries()) {
  //   if (char == "." && dotsArr.length <= 1) {
  //     dotsArr.push(index);
  //   }
  // }

  return (
    <tr className="bg-[#0C1015] divide-x-[0.5px] divide-[#ffffff40]">
      <td className="py-3 px-2 text-sm text-[#ffffffcc] relative">
        <span className="break-all block overflow-hidden mr-8">
          {/* {dKey.slice(0, -(dotsArr[1] + 1))} */}
          {dKey}
        </span>
        <Copy type="tr" />
      </td>
      <td className="py-3 px-2 text-sm text-[#ffffffcc] relative">
        <span className="break-all block overflow-hidden mr-8">{value}</span>
        <Copy type="tr" />
      </td>
      <td className="py-3 px-3 text-sm text-[#ffffffcc] relative">
        <span className="break-all w-[55px] block overflow-hidden mr-8">
          {type}
        </span>
        {/* <Copy type="tr" /> */}
      </td>
    </tr>
  );
}
