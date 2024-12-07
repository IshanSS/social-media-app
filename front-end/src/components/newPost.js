import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Newpost.css"; // Create this CSS file for styling

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const token = location.state?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      console.log("Token:", token); // Debugging statement
      const response = await fetch("http://localhost:3015/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
        // Navigate to profile page
        navigate("/profile");
        // Reset form fields
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
        alert(`Error: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="new-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="new-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
