import {Link} from "react-router-dom";
import { numberFormat } from "../../utils/format";

export default function Topic({item}){
    return (
        <Link to='/' className="py-2 px-4 transition-colors hover:bg-[#0f172a] rounded-[0.375rem]">
            <div className="text-[10px]">{item.local}</div>
            <div className="text-[13px] font-bold">{item?.topic.title}</div>
            {item?.participantCount && <div className="text-[10px] text-[#71767b] font-bold flex justify-start">{numberFormat(item.participantCount)} users participated to this prediction</div>}
        </Link>
    )
}