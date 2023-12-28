import React from "react";
import { unixFormat } from "../../utils/format";

const Content = ({ data, setIsOpen }) => {
  return (
    <div>
      <div
        id="content-area"
        className="relative ml-5 flex flex-col gap-2 justify-center items-start"
      >
        <div className="absolute w-[25px] h-[25px] bg-[#212f48] -left-[23px] top-[25px] rotate-45 z-0"></div>
        <div className="absolute w-[25px] h-[25px] bg-[#212f48] -right-[23px] top-[25px] rotate-45 z-0"></div>

        {/* Kehanet İçeriği */}
        <div className="bg-[#152033]/[.60] max-w-[590px] overflow-y-scroll pt-3 pb-4 px-4  rounded-[0.375rem] z-1 flex flex-col">
          <div className="flex text-[10px] text-[white]/[.60] font-thin gap-5 justify-center">
            <div>Shared Date: {unixFormat(data[3]).toLocaleString()}</div>
            <div>End Date: {unixFormat(data[4]).toLocaleString()}</div>
          </div>

          <h3 className="overflow-auto-y mt-5">{String(data[1])}</h3>

          {data[7] !== true ? (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[green] p-1 items-center justify-center rounded mt-5"
            >
              Participate Now!
            </button>
          ) : (
            <button className="bg-[gray] p-1 items-center justify-center rounded mt-5 cursor-not-allowed opacity-50">
              The predictor has expired!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
