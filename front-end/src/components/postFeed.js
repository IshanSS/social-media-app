// components/PostFeed.js
import React from "react";
import "./styles/Postfeed.css";

const PostFeed = () => {
  const posts = [
    {
      id: 1,
      username: "f1",
      image: "https://via.placeholder.com/500",
      caption: "LAST FIVE ABU DHABI GP WINNERS",
    },
  ];

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <img
              src="https://via.placeholder.com/50"
              alt="profile-pic"
              className="post-profile-pic"
            />
            <span>{post.username}</span>
          </div>
          <img src={post.image} alt="post" className="post-image" />
          <div className="post-caption">{post.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
