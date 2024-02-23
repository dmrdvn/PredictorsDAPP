import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { createPost } from "../../Web3Client";
import Button from "../button";
import { dateToUnix, ethToWei } from "../../utils/format";
import Loader from "../Loader";

import { collection } from "firebase/firestore";
import { db, addNewPost } from "../../utils/firebaseConfig";

function CreatePost() {
  const navigate = useNavigate();
  const [postDescription, setPostDescription] = useState("");
  const [postBet, setPostBet] = useState("");
  const [postEndDate, setPostEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const MAX_CONTENT_LENGTH = 600;
  const postsRef = collection(db, "posts");

  /* BLOCKCHAIN' POST GÖNDERDİYORUZ */
  const handlePostCreation = async () => {
    try {
      setLoading(true);

      if (postDescription.length > MAX_CONTENT_LENGTH) {
        alert(
          `Maximum character limit (${MAX_CONTENT_LENGTH}) reached for the prediction details!`
        );
        return;
      }

      await createPost(
        postDescription,
        ethToWei(postBet),
        dateToUnix(postEndDate),
        0,
        async (transactionHash) => {
          setLoading(true);

          await performPostCompletionActions();
        }
      );
      await addNewPost(postsRef, postDescription, postBet, postEndDate);

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  /*   const handleAddFirebase = useCallback(() => {
    const addFirebaseAsync = async () => {
      addNewPost(postsRef, postDescription, postBet, postEndDate);
    };

    addFirebaseAsync();
  }, [postDescription, postBet, postEndDate, postsRef]); */

  const performPostCompletionActions = async () => {
    setLoading(false);
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Harf sınır kontrolü
    if (inputValue.length <= MAX_CONTENT_LENGTH) {
      setPostDescription(inputValue);
    }
  };

  const remainingCharacters = MAX_CONTENT_LENGTH - postDescription.length;

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
          value={postDescription}
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
