import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import serverless from "serverless-http";

dotenv.config({
  path: "./env",
});

// Connect to the database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const handler = serverless(app);
export { handler };
export default app;
