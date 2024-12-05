import React, { useState, useEffect } from "react";
import "./styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3015/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          const errorData = await response.json();
          setError(
            `Failed to fetch profile: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <div className="profile-stats">
            <span>{user.followers || 0} Followers</span>
            <span>{user.following || 0} Following</span>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="btn edit-btn">Edit Profile</button>
        <button className="btn new-post-btn">Add New Post</button>
      </div>
      <div className="profile-posts">
        <h2>Your Posts</h2>
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
