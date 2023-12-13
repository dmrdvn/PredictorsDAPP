import { getPostByStatus } from "../../../Web3Client";

import Post from "../../../components/post";
import React, { useState, useEffect } from "react";

export default function General() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handleInit = async () => {
      try {
        let postsByStatus = await getPostByStatus(0);
        setPosts(postsByStatus);
        console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    handleInit();
  }, []);

  return (
    <div className="px-5 py-5">
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Post data={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
