import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { participateInPost, getSideByUser } from "../../Web3Client";
import Button from "../button";
import { unixFormat, ethToWei, weiToEth } from "../../utils/format";
import Loader from "../Loader";

const SIDE = {
  LEFT: 0,
  RIGHT: 1,
};

function ParticipatePost({ data }) {
  const navigate = useNavigate();
  const [post, setPost] = useState(data);
  const [participants, setParticipants] = useState();
  const [postBet, setPostBet] = useState("");
  const [side, setSide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePostParticipatation = async () => {
    //const weiAmount = ethToWei(postBet);

    try {
      setLoading(true);
      await participateInPost(
        post[0],
        side,
        ethToWei(postBet),
        async (transactionHash) => {
          setLoading(true);

          await performPostCompletionActions();
        }
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Participate failed:", error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    setPost(data);

    // Katılımcıları ve bahis miktarlarını getir
    const fetchParticipantData = async () => {
      const participantData = [];
      for (const wallet of post[5]) {
        const betByWalet = await getSideByUser(wallet, post[0]);
        participantData.push({ wallet, ...betByWalet });
      }
      setParticipants(participantData);
    };

    fetchParticipantData();
  }, [post]);

  const performPostCompletionActions = async () => {
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-5">
      {loading && <Loader />}
      <p>Do you believe this prediction will gone?</p>

      <div className="bg-[#eef3f41a] w-full p-4 overflow-hidden rounded-[0.375rem] z-0 flex flex-col">
        <div className="flex text-[10px] text-[white]/[.50]">
          Shared Date: {unixFormat(post[3]).toLocaleString()}
        </div>

        <h3>{post[1]}</h3>

        <div className="relative bg-[#152033] z-1 mt-10 w-full px-3 py-4  rounded-[0.375rem] z-0 flex flex-col">
          <div className="flex flex-col">
            <div className="text-sm absolute top-[-15px] left-0  bg-[#152033] z-0 px-[1rem] py-3 rounded-md">
              Participants:{" "}
            </div>

            <div className="flex flex-col mt-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="underline font-bold text-sm flex justify-left items-center">
                  Wallet Address
                </div>
                <div className="underline font-bold text-sm flex justify-left items-center">
                  Side
                </div>
                <div className="underline font-bold text-sm flex justify-left items-center">
                  Bet Amount
                </div>

                {participants &&
                  participants.map((participant, index) => (
                    <React.Fragment key={index}>
                      <div className="text-sm flex justify-left items-center">
                        {participant.wallet === post[5][0]
                          ? "0x..." +
                            String(participant.wallet).slice(-10) +
                            " ( Author )"
                          : "0x..." + String(participant.wallet).slice(-10)}
                      </div>
                      <div className="text-sm flex justify-left items-center">
                        {Number(participant.side) == 1 ? "Reject" : "Approve"}
                      </div>
                      <div className="text-sm flex justify-left items-center">
                        {weiToEth(participant.betAmount)}
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[.1rem] w-full bg-[white]/[.30] rounded"></div>

      <div className="w-full flex gap-3">
        <button
          onClick={() => setSide(0)}
          className="w-full flex items-center justify-center p-2 rounded bg-[green] focus:border focus:border-[white]"
        >
          Approve
        </button>

        <button
          onClick={() => setSide(1)}
          className="w-full flex items-center justify-center p-2 rounded bg-[red] focus:border focus:border-[white]"
        >
          Reject
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="number"
          className="w-full p-2 border rounded-md text-black justify-center"
          placeholder="Bet Amount - (eg. 0.1 BNB)"
          value={postBet}
          onChange={(e) => setPostBet(e.target.value)}
        />
      </div>

      {submitted ? (
        <h3 className="text-[green]">
          You have successfully participated in this prediction!
        </h3>
      ) : (
        <Button
          onClick={() => handlePostParticipatation()}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          {" "}
          Participate !{" "}
        </Button>
      )}
    </div>
  );
}

export default ParticipatePost;
