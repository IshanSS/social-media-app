// components/Sidebar.js
import React from "react";
import "./styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">SocialApp</div>
      <ul className="sidebar-menu">
        <li>🏠 Home</li>
        <li>🔍 Search</li>
        <li>🎥 Explore</li>
        <li>📹 Reels</li>
        <li>💬 Messages</li>
        <li>❤️ Notifications</li>
        <li>➕ Create</li>
        <li>👤 Profile</li>
        <li>⚙️ More</li>
      </ul>
    </div>
  );
};

export default Sidebar;
