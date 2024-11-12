// // client/src/components/Home.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import './Home.css'; // Import the CSS file for styling

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/posts");
//         setPosts(res.data);
//       } catch (err) {
//         setError("Error fetching posts.");
//         console.error(err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (error) {
//     return <p className="error-message">{error}</p>;
//   }

//   return (
//     <div className="home-container">
//       <h1 className="home-title">All Posts</h1>
//       {posts.length > 0 ? (
//         <div className="post-list">
//           {posts.map((post) => (
//             <div key={post.id} className="post-card">
//               <h2 className="post-title">
//                 <Link to={`/post/${post.id}`} className="post-link">{post.title}</Link>
//               </h2>
//               {post.image_url && (
//                 <img
//                   src={`http://localhost:5000${post.image_url}`}
//                   alt="Post"
//                   className="post-image"
//                 />
//               )}
//               <p className="post-body">{post.body.substring(0, 100)}...</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No posts found.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
// client/src/components/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeletePost from './DeletePost'; 
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Error fetching posts.");
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">All Posts</h1>
      {posts.length > 0 ? (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2 className="post-title">
                <Link to={`/post/${post.id}`} className="post-link">{post.title}</Link>
              </h2>
              {post.image_url && (
                <img
                  src={`http://localhost:5001${post.image_url}`}
                  alt="Post"
                  className="post-image"
                />
              )}
              <p className="post-body">{post.body.substring(0, 100)}...</p>
              <DeletePost postId={post.id} onPostDeleted={handlePostDeleted} /> {/* Pass the handler */}
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Home;
