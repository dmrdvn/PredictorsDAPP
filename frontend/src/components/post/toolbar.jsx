import React from "react";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { formattedBet, weiToEth } from "../../utils/format";

const Toolbar = ({ data }) => {
  return (
    <div
      id="post-action"
      className="flex justify-between w-full  px-5 py-3 border-solid border-t-2 border-[#2b3b58] rounded-b-[0.375rem] text-[.8rem]"
    >
      {/* Action Butonları */}
      <div id="interact-buttons" className="flex gap-5">
        <a
          href="#"
          className="p-1 flex items-center gap-1 hover:text-[#f91880] hover:text-[18px]"
          title="Share"
        >
          <AiOutlineShareAlt /> <span className="text-[.9rem]">121</span>
        </a>
        <a
          href="#"
          className="p-1 flex items-center gap-1 hover:text-[#00ba7c] hover:text-[18px]"
          title="Comments"
        >
          <AiOutlineComment /> <span className="text-[.9rem]">343</span>
        </a>
        <a
          href="#"
          className="p-1 flex items-center gap-1 hover:text-[orange] hover:text-[18px]"
          title="Trusted Points"
        >
          <VscWorkspaceTrusted /> <span className="text-[.9rem]">100</span>
        </a>
      </div>

      {/* Post Metadaları */}
      <div className="flex gap-4">
        <div className="flex items-center justify-center gap-1">
          Participants:
          <span className="p-1  bg-[#eef3f41a] rounded-[0.375rem]">
            {data[5].length}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1">
          <p>Bet Pool:</p>
          <span className="p-1 pr-1.5 bg-[#eef3f41a] rounded-[0.375rem] flex items-center">
            <FaEthereum />
            {formattedBet(data[6])}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1">
          Reliability Score:
          <span
            className="p-1  bg-[#eef3f41a] rounded-[0.375rem]"
            title="Calculate Method => Web3 ID + Participant Count + Trust Count + Comment Count"
          >
            {weiToEth(data[6]) > 0 && weiToEth(data[6]) <= 1
              ? "50"
              : weiToEth(data[6]) > 1 && weiToEth(data[6]) <= 5
              ? "75"
              : weiToEth(data[6]) > 5
              ? "100"
              : "0"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
