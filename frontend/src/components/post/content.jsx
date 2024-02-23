import React, { useEffect } from "react";
import { unixToDate } from "../../utils/format";
import {
  db,
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "../../utils/firebaseConfig"; //For init firebase
import { QuerySnapshot } from "firebase/firestore/lite";

const Content = ({ post, setIsOpen }) => {
  /* const [posts, setPosts] = React.useState([]);

  const createPost = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      id: 0,
      name: "Kehanet",
      avatar: "https://avatars.githubusercontent.com/u/77183103?v=4",
    });

    console.log(
      "Document written with ID: ",
      docRef.id,
      " name:",
      docRef.name,
      " docRef:",
      docRef.avatar
    );
  };

  const getPost = async () => {
    const querySnopshat = await getDocs(collection(db, "posts"));
    const temporaryArr = [];
    querySnopshat.forEach((doc) => {
      temporaryArr.push(doc.data());
    });
    setPosts(temporaryArr);

    for (let i = 0; i < posts.length; i++) {
      console.log(
        " - ID: ",
        posts[i].id,
        " - Name: ",
        posts[i].name,
        " - Avatar: ",
        posts[i].avatar
      );
    }
  }; */

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
            <div>
              {/*Shared Date:  {unixFormat(post.postDate).toLocaleString()} */}
              Shared Date: {unixToDate(post.postDate)}
            </div>
            <div>
              {/*End Date:  {unixFormat(post.postEndDate).toLocaleString()} */}
              End Date: {unixToDate(post.postEndDate)}
            </div>
          </div>

          <h3 className="overflow-auto-y mt-5">{post.postContent}</h3>

          {post.postFinished !== true ? (
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
