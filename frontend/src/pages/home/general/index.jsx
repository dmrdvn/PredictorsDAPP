import { getPostCount, getPost } from "../../../Web3Client";

import Post from "../../../components/post";
import React, { useState, useEffect, useCallback } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

const ref = collection(db, "posts"); //Collection'ların olduğu yer

export default function General() {
  // const [posts, setPosts] = useState([]);
  const [posts, isLoading] = useCollectionData(ref);
  /* const [logggedIn, setLoggedIn] = useState(posts && posts.length > 0); */

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await getPostCount();

        const allPosts = [];
        for (let i = count; i >= 1; i--) {
          const post = await getPost(i);
          allPosts.push(post);
        }
        //allPosts.sort((a, b) => b.postDate - a.postDate);

        setPosts(allPosts);
        setLoggedIn(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-5 py-5">
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Post postData={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
