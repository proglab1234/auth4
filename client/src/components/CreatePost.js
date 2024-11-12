// // client/src/components/CreatePost.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         "http://localhost:5000/posts",
//         { title, body, image_url: imageUrl },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       navigate("/"); // Redirect to homepage after creating the post
//     } catch (err) {
//       setError("Error creating post.");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Post</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleCreatePost}>
//         <div>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <textarea
//             placeholder="Body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//           />
//         </div>
//         <div>
//           <button type="submit">Create Post</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;
// client/src/components/CreatePost.js
// client/src/components/CreatePost.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }
    console.log('Form Data:', formData); 

    try {
      const res = await axios.post(
        "http://localhost:5001/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      navigate("/"); 
    } catch (err) {
      
      setError("Error creating post: " + (err.response?.data.message || err.message));
      console.error("Error details:", err); 
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreatePost}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
