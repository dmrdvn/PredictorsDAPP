import { getPostCount, getPost } from "../../../Web3Client";

import Post from "../../../components/post";
import React, { useState, useEffect } from "react";

export default function General() {
  const [posts, setPosts] = useState([]);
  const [logggedIn, setLoggedIn] = useState(posts && posts.length > 0);

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
      {!logggedIn && (
        <div className="px-5 py-5">
          <h2 className="text-center mt-10 text-[gray]/[.50]">
            Please log in to see the contents
          </h2>
        </div>
      )}
      {
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <Post data={post} />
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
