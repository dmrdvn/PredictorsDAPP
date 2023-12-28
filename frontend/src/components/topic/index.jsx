import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/format";

export default function Topic({ item }) {
  return (
    <Link
      to="/"
      className="py-4 px-3 transition-colors hover:bg-[#152033] rounded-[0.375rem]"
    >
      <div className="text-[9px] text-[#152033] bg-[red]/[.60] text-[white]/[.60] rounded-lg px-1 py-[.1rem] w-[40%] text-center text-thin mb-2">
        {item.local}
      </div>
      <div className="text-sm font-normal text-[white]/[.80]">
        {item?.topic.title}
      </div>
      {item?.participantCount && (
        <div className="text-[10px] text-[#71767b] font-bold flex justify-start">
          {numberFormat(item.participantCount)} users participated to this
          prediction
        </div>
      )}
    </Link>
  );
}
