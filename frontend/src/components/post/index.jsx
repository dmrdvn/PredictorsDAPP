import React, { useState, useEffect } from "react";

import { getUser } from "../../Web3Client";
import ParticipatePost from "../participatepost";
import Photo from "./photo";
import Content from "./content";
import Toolbar from "./toolbar";
import PostModal from "../modal";

export default function Post({ data }) {
  const [author, setAuthor] = useState("");
  const [postsCount, setPostsCount] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let authorInfo = await getUser(data[5][0]); //First participant
        if (authorInfo && authorInfo !== undefined) {
          setAuthor(authorInfo);
          let postCount = authorInfo[7].length; //Post Count of Author
          setPostsCount(postCount);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [data, data[5]]);

  return (
    <div className="relative  bg-[#212f48] rounded-[0.375rem]  flex flex-col justify-start items-start mb-10">
      <div className="absolute top-0 left-0 px-1 bg-[#eef3f41a] rounded-[0.375rem] m-2">
        <span className="text-[.80rem] opacity-50">#{data[0]}</span>
      </div>

      <div
        id="post-inner"
        className=" flex justify-center items-start px-5 py-10"
      >
        {/* Photo Area */}
        <Photo postsCount={postsCount} name={author.fullName} />

        {/* Description Area */}
        <Content data={data} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Interact Area */}
      <Toolbar data={data} />

      <PostModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <ParticipatePost data={data} />
      </PostModal>
    </div>
  );
}
