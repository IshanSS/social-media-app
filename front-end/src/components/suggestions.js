import React from "react";
import "./styles/Suggestions.css";

const Suggestions = () => {
  const suggestions = [
    { id: 1, username: "instagram", followedBy: "11 more" },
    { id: 2, username: "Archana", followedBy: "9 more" },
  ];

  return (
    <div className="suggestions">
      <div className="suggestions-header">Suggested for you</div>
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="suggestion">
          <div className="suggestion-info">
            <span>{suggestion.username}</span>
            <small>Followed by {suggestion.followedBy}</small>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
