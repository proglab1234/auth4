
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads')); // Serve uploaded images
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use('/posts', postRoutes);
app.use("/auth", authRoutes);   // User authentication
app.use("/posts", postRoutes);  // Blog posts

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
