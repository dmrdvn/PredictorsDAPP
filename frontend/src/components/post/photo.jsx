import React, { useEffect, useState } from "react";
import lv1 from "../../assets/nfts/lv1predictor.png";
import lv2 from "../../assets/nfts/lv2predictor.png";
import lv3 from "../../assets/nfts/lv3predictor.png";
import lv4 from "../../assets/nfts/lv4predictor.png";
import lv5 from "../../assets/nfts/lv5predictor.png";
import lv6 from "../../assets/nfts/lv6predictor.png";

export default function Photo({ img, name }) {
  /* useEffect(() => {
    handlePhoto(postsCount);
  }, [postsCount]); */

  /*  function handlePhoto(postsCount) {
    if (postsCount <= 3) {
      setProfileImg(lv1);
    } else if (postsCount > 3 && postsCount <= 5) {
      setProfileImg(lv2);
    } else if (postsCount > 5 && postsCount <= 10) {
      setProfileImg(lv3);
    } else if (postsCount > 10 && postsCount <= 20) {
      setProfileImg(lv4);
    } else if (postsCount > 20 && postsCount <= 30) {
      setProfileImg(lv5);
    } else if (postsCount > 30) {
      setProfileImg(lv6);
    }
  }
 */
  return (
    <div
      id="photo"
      className="flex flex-col gap-3 items-center justify-center min-w-[50px]"
    >
      <img src={img} className="w-12 h-12 rounded-full object-cover" />

      <h3 className="text-[.80rem] opacity-50 flex items-center justify-center text-center">
        {name}
      </h3>
    </div>
  );
}
