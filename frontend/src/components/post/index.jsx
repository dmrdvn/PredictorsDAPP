import React, { useState, useEffect } from "react";
import lv1 from "../../assets/nfts/lv1predictor.png";
import lv2 from "../../assets/nfts/lv2predictor.png";
import lv3 from "../../assets/nfts/lv3predictor.png";
import lv4 from "../../assets/nfts/lv4predictor.png";
import lv5 from "../../assets/nfts/lv5predictor.png";
import lv6 from "../../assets/nfts/lv6predictor.png";
import {
  dateFormat,
  unixFormat,
  formattedBet,
  formattedBe2,
  calculateTimeLeft,
} from "../../utils/format";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { getUser } from "../../Web3Client";

export default function Post({ data }) {
  //Date İşlemleri
  const [leftDays, setLeftDays] = useState(calculateTimeLeft(data[4]));
  const [progress, setProgress] = useState(0);
  const [author, setAuthor] = useState("");
  const [profileImg, setProfileImg] = useState("");

  /*  useEffect(() => {
    const interval = setInterval(() => {
      const newLeftTime = calculateTimeLeft(data[4]);
      setLeftDays(() => newLeftTime);
      console.log("New Left Time:", newLeftTime);

      if (newLeftTime === "Kehanetin sonucu bekleniyor..") {
        clearInterval(interval);
      } else {
        const currentTime = new Date();
        const timestamp = currentTime.getTime();
        const totalTimeInMilliseconds = data[4] - data[3];
        const elapsedTime = timestamp - data[3];
        const newProgress = (elapsedTime / totalTimeInMilliseconds) * 100;
        setProgress(() => newProgress);
      }
    }, 1000);

    showProfile();

    return () => clearInterval(interval);
  }, [data[3], data[4], [author]]); */

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let authorInfo = await getUser(data[5][0]); //First participant
        if (authorInfo !== undefined) {
          setAuthor(authorInfo);
          let postCount = authorInfo[7].length;

          if (postCount <= 3) {
            setProfileImg(lv1);
          } else if (postCount > 3 && postCount <= 5) {
            setProfileImg(lv2);
          } else if (postCount > 5 && postCount <= 10) {
            setProfileImg(lv3);
          } else if (postCount > 10 && postCount <= 20) {
            setProfileImg(lv4);
          } else if (postCount > 20 && postCount <= 30) {
            setProfileImg(lv5);
          } else if (postCount > 30) {
            setProfileImg(lv6);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [data[5]]);

  return (
    <div className="relative  bg-[#eef3f41a]  rounded-[0.375rem]  flex flex-col justify-start items-start mb-10">
      <div className="absolute top-0 left-0 px-1 bg-[#eef3f41a] rounded-[0.375rem] m-2">
        <span className="text-[.80rem] opacity-50">#{data[0]}</span>
      </div>

      <div
        id="post-inner"
        className=" flex justify-center items-start px-5 py-10"
      >
        {/* Fotoğraf Alanı */}
        <div
          id="photo"
          className="flex flex-col gap-3 items-center justify-center min-w-[50px]"
        >
          <img
            src={profileImg}
            className="w-12 h-12 rounded-full object-cover"
          />

          <h3 className="text-[.80rem] opacity-50 flex items-center justify-center text-center">
            {author.fullName}
          </h3>
        </div>

        {/* Content Alanı */}
        <div
          id="content-area"
          className="relative ml-5 flex flex-col gap-2 justify-center items-start"
        >
          <div
            id=""
            className="absolute w-[25px] h-[25px] bg-[#192435] -left-[calc(0.7%)] top-[calc(10%)] rotate-45 z-1"
          ></div>

          {/* Kehanet İçeriği */}
          <div className=" bg-[#192435] w-full p-4 overflow-hidden rounded-[0.375rem] z-0 flex flex-col ">
            <div className="flex text-[10px] text-[white]/[.50]">
              Shared Date: {unixFormat(data[3]).toLocaleString()}
            </div>

            <h3>{data[1]}</h3>
            <span className="flex justify-end">{}</span>
          </div>

          {/* Kalan Süre Alanı */}
          <div id="time" className="flex justify-center gap-5 items-center">
            <div>Left Times {leftDays} </div>
          </div>


          <div id="time" className="flex justify-center gap-5 items-center">
            <div>End Date {unixFormat(data[4]).toLocaleString()} </div>
          </div>
        </div>
      </div>

      {/* Kalan Süre Progress Bar */}
      <div className="w-full h-1  relative flex justify-start items-start">
        {/* Progress Bar */}
        <div
          className="h-full bg-[red] shadow-custom"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Post Etkileşim Alanı */}
      <div
        id="post-action"
        className="flex justify-between w-full bg-[#192435] px-5 py-3  border-t-1 rounded-b-[0.375rem] text-[.8rem]"
      >
        {/* Action Butonları */}
        <div id="interact-buttons" className="flex gap-5">
          <a
            href="#"
            className="p-1 flex items-center gap-1 hover:text-[#f91880] hover:text-[18px]"
            title="Paylaş"
          >
            <AiOutlineShareAlt /> <span className="text-[.9rem]">121</span>
          </a>
          <a
            href="#"
            className="p-1 flex items-center gap-1 hover:text-[#00ba7c] hover:text-[18px]"
            title="Yorum Yap"
          >
            <AiOutlineComment /> <span className="text-[.9rem]">343</span>
          </a>
          <a
            href="#"
            className="p-1 flex items-center gap-1 hover:text-[orange] hover:text-[18px]"
            title="Güvenilir"
          >
            <VscWorkspaceTrusted /> <span className="text-[.9rem]">100</span>
          </a>
        </div>

        {/* Post Metadaları */}
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-1">
          Participants:
            <span className="p-1  bg-[#eef3f41a] rounded-[0.375rem]">200</span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <p>Bet Pool:</p>
            <span className="p-1 pr-1.5 bg-[#eef3f41a] rounded-[0.375rem] flex items-center">
              <FaEthereum />
              {formattedBet(data[2])}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1">
          Reliability Score:
            <span
              className="p-1  bg-[#eef3f41a] rounded-[0.375rem]"
              title="Calculate Method => Web3 ID + Participant Count + Trust Count + Comment Count"
            >
              1212
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
