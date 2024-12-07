import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [menuVisible, setMenuVisible] = useState(null); // Add state for menu visibility
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const profileResponse = await fetch(
          "http://localhost:3015/api/auth/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUser(profileData.data);

          const postsResponse = await fetch(
            "http://localhost:3015/api/posts/user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (postsResponse.ok) {
            const postsData = await postsResponse.json();
            setPosts(postsData.posts);
          } else {
            const errorData = await postsResponse.json();
            setError(
              `Failed to fetch posts: ${errorData.message || "Unknown error"}`
            );
          }
        } else {
          const errorData = await profileResponse.json();
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

  const handleNewPost = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    navigate("/new-post", {
      state: { token },
    });
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3015/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        const errorData = await response.json();
        setError(
          `Failed to delete post: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const toggleMenu = (postId) => {
    setMenuVisible(menuVisible === postId ? null : postId);
  };

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
        <button className="btn new-post-btn" onClick={handleNewPost}>
          Add New Post
        </button>
      </div>
      <div className="profile-posts">
        <h2>Your Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h3>{post.title}</h3>
                <div className="post-menu">
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu(post._id)}
                  >
                    &#x22EE;
                  </button>
                  {menuVisible === post._id && (
                    <div className="menu">
                      <button
                        className="menu-item"
                        onClick={() => handleEditPost(post._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="menu-item"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p>{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="post-image" />
              )}
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
