// client/src/components/DeletePost.js
import React, { useState } from "react";
import axios from "axios";

const DeletePost = ({ postId }) => {
  const [error, setError] = useState("");

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5001/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      window.location.href = "/"; 
    } catch (err) {
      setError("Error deleting post.");
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleDeletePost} style={{ color: "red" }}>
        Delete Post
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeletePost;
