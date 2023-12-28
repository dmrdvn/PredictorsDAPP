import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loader = () => {
  return (
    <>
      <div className="loader-overlay">
        <div className="loader-content flex flex-col gap-3">
          <AiOutlineLoading className="loader-icon" />
          <h1 className="text-[black]">
            İşlem tamamlanıyor, lütfen bekleyiniz..
          </h1>
        </div>
      </div>
    </>
  );
};

export default Loader;
