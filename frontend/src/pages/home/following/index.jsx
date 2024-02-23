import React, { useCallback } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

const ref = collection(db, "posts");

const samplePost = {
  id: 3,
  postCategory: "Kehanet",
  postContent:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  author: "0xBa2dB1ab7510dDfCB34f7121a685611f81428894",
  authorPhoto: "https://placehold.co/600x400/png",
  postDate: "2013",
  postEndDate: "2026",
  postParticipants: [
    {
      side: "0",
      bet: 100,
      wallet: "0xBa2dB1ab7510dDfCB34f7121a685611f81428894",
    },
    {
      side: "1",
      wallet: "0xBa2dB1ab7510dDfCB34f7121a685611f81428830",
      bet: 200,
    },
  ],
  postBet: 0.02,
  postBetPool: 0.1,
  postFinished: true,
  trustCount: 1000,
  comments: [
    {
      content: "Deneme Yorum!",
      author: "0xB..894",
    },
    {
      content: "İkinci Yorum!",
      author: "0xB..354",
    },
  ],
};

export default function Following() {
  const [posts, isLoading] = useCollectionData(ref);

  const handleAddPost = useCallback(() => {
    addDoc(ref, {
      id: samplePost.id,
      postCategory: samplePost.postCategory,
      postContent: samplePost.postContent,
      author: samplePost.author,
      authorPhoto: samplePost.authorPhoto,
      postDate: samplePost.postDate,
      postEndDate: samplePost.postEndDate,
      postParticipants: samplePost.postParticipants,
      postBet: samplePost.postBet,
      postBetPool: samplePost.postBetPool,
      postFinished: samplePost.postFinished,
      trustCount: samplePost.trustCount,
      comments: samplePost.comments,
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 py-5">
      {/* Postlar: {posts?.length} */}
      {posts?.map((post, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border border-b-1 border-[gray] p-3"
        >
          <div>Post Id: {post?.id}</div>
          <div>Kategori: {post?.postCategory}</div>
          <div>İçerik: {post?.postContent}</div>
          <div>Yazar: {post?.author}</div>
          <div>Yazar Photo: {post?.authorPhoto}</div>
          <div>Kategori: {post?.postCategory}</div>
          <div>Başlangıç: {post?.postDate}</div>
          <div>Bitiş: {post?.postEndDate}</div>
          <div>
            Katılımcılar:{" "}
            {post?.postParticipants?.map((participant, index) => (
              <ul key={index} className="p-3 border">
                <li>Side: {participant.side}</li>
                <li>Bet: {participant.bet}</li>
                <li>Wallet: {participant.wallet}</li>
              </ul>
            ))}
          </div>
          <div>Bet Amount: {post?.postBet}</div>
          <div>Bet Pool: {post?.postBetPool}</div>
          <div>Bitti mi ? : {post?.postFinished.toString()}</div>
          <div>Like Sayısı: {post?.trustCount}</div>
          <div>
            Yorumlar:{" "}
            {post?.comments?.map((comment, index) => (
              <ul key={index} className="p-3 border">
                <li>İçerik: {comment.content}</li>
                <li>Yorum Yapan: {comment.author}</li>
              </ul>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-5 bg-[blue]">
        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </div>
  );
}
