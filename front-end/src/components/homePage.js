// pages/HomePage.js
import React from "react";
import Sidebar from "./sidebar";
import PostFeed from "./postFeed";
import Suggestions from "./suggestions";
import "./styles/Home.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <PostFeed />
      <Suggestions />
    </div>
  );
};

export default HomePage;
