import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Setting limit of data sent by user using form
app.use(express.json({ limit: "16kb" }));
// Handling data sent by URL
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// For handling static/public assets like images
app.use(express.static("public"));
// Allow us to perform CRUD on user browser cookies
app.use(cookieParser());

// Routes
import orgRouter from "./routes/org.routes.js";
import repoRouter from "./routes/repo.routes.js";
import userRouter from "./routes/user.routes.js";

// Route declaration
app.use("/api/v1/org", orgRouter);
app.use("/api/v1/repo", repoRouter);
app.use("/api/v1/user", userRouter);

export default app;
