// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// const app = express();

// app.use(cors({ origin: process.env.CORS_ORIGIN , credentials: true }));

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ limit: "16kb", extended: true }));
// app.use(express.static("public"));

// app.use(cookieParser());

// // routes
// import userRoutes from "./routes/user.routes.js";
// import postRoutes from "./routes/post.routes.js";

// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);

// export { app };

// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import msgRoutes from "./routes/message.routes.js";

import dotenv from 'dotenv';
dotenv.config();


// Create Express app instance
const app = express();

// Middleware Configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Define Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/message", msgRoutes);

export { app };
