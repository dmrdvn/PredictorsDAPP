import React, { useState } from "react";
import Web3 from "web3";
import { createPost } from "../../Web3Client";
import Button from "../button";

const SIDE = {
  LEFT: 0,
  RIGHT: 1,
};

function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [postBet, setPostBet] = useState("");
  const [postEndDate, setPostEndDate] = useState("");

  const handlePostCreation = async () => {
    try {
      const betInWei = Web3.utils.toWei(postBet, "ether");
      const jsDate = new Date(postEndDate);
      const unixTimestamp = Math.floor(jsDate.getTime() / 1000);
      
      await createPost(postContent, betInWei, unixTimestamp, SIDE.LEFT);
      // Post oluşturma başarılı oldu
    } catch (error) {
      console.error(error);
      // Post oluştururken hata oluştu
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[1.3rem] font-bold underline">Create a Prediction</h3>
      <p className="text-[.9rem]">To create your prediction;<br/>
      => Give some details about your prediction.<br/>
      => Enter the bet amount you placed for your prediction,<br/>
      => Specify the final date about the prediction will come true.<br/>
      <br/>
      Submit and <span className="underline">wait 5-6 seconds</span> for your prediction to reach the blockchain network and close this form.</p>
      <div className="w-full">
        <textarea
          className="w-full p-2 border rounded-md text-black bg-gray-100"
          placeholder="Details of your Prediction - (eg. Bitcoin be above $ 50,000 on 31.12.2021?)"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex flex-row gap-2">
        <input
          type="number"
          className="w-1/2 p-2 border rounded-md text-black"
          placeholder="Bet Amount - (eg. 0.1 BNB)"
          value={postBet}
          onChange={(e) => setPostBet(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-1/2 p-2 border rounded-md text-black"
          placeholder="Deadline of Prediction"
          value={postEndDate}
          onChange={(e) => setPostEndDate(e.target.value)}
        />
      </div>

      {/* <select value={side} onChange={(e) => setSide(e.target.value)}>
        <option value="0">Sol</option>
        <option value="1">Sağ</option>
      </select> */}
      <Button
        onClick={handlePostCreation}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Create Prediction
      </Button>
    </div>
  );
}

export default CreatePost;
