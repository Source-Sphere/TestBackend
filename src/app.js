import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("public"));

//routes import
import orgRouter from "./routes/org.routes/js";

//route decleration
app.use("/api/v1/org", orgRouter);

export { app };
