import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { createPost } from "../../Web3Client";
import Button from "../button";
import { ethToWei, unixFormat } from "../../utils/format";
import Loader from "../Loader";

function CreatePost() {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState("");
  const [postBet, setPostBet] = useState("");
  const [postEndDate, setPostEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const MAX_CONTENT_LENGTH = 600;

  const handlePostCreation = async () => {
    try {
      setLoading(true);

      if (postContent.length > MAX_CONTENT_LENGTH) {
        alert(
          `Maximum character limit (${MAX_CONTENT_LENGTH}) reached for the prediction details!`
        );
        return;
      }

      const jsDate = new Date(postEndDate);
      const unixTimestamp = Math.floor(jsDate.getTime() / 1000);

      await createPost(
        postContent,
        ethToWei(postBet),
        unixTimestamp,
        0,
        async (transactionHash) => {
          setLoading(true);

          await performPostCompletionActions();
        }
      );

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const performPostCompletionActions = async () => {
    setLoading(false);
    setSubmitted(true);

    console.log(
      "OK 2 => Content: ",
      postContent,
      "Bet: ",
      ethToWei(postBet),
      "Side: ",
      0
    );
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Harf sınır kontrolü
    if (inputValue.length <= MAX_CONTENT_LENGTH) {
      setPostContent(inputValue);
    }
  };

  const remainingCharacters = MAX_CONTENT_LENGTH - postContent.length;

  return (
    <div className="flex flex-col gap-5">
      {loading && <Loader />}
      <h3 className="text-[1.3rem] font-bold underline">Create a Prediction</h3>
      <p className="text-[.9rem]">
        To create your prediction;
        <br />
        - Give some details about your prediction.
        <br />
        - Enter the bet amount you placed for your prediction,
        <br />
        - Specify the final date about the prediction will come true.
        <br />
        <br />
        Submit and <span className="underline">wait 5-6 seconds</span> for your
        prediction to reach the blockchain network and close this form.
      </p>
      <div className="w-full">
        <textarea
          className="w-full p-2 border rounded-md text-black bg-gray-100"
          placeholder="Details of your Prediction - (eg. Bitcoin be above $ 50,000 on 31.12.2021?)"
          value={postContent}
          onChange={handleInputChange}
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
      {submitted ? (
        <h3 className="text-[green]">
          Your prediction has been successfully created!
        </h3>
      ) : (
        <Button onClick={handlePostCreation}>Create Prediction</Button>
      )}
    </div>
  );
}

export default CreatePost;
