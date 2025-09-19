import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();
const port = process.env.PORT ?? 8000;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server is live on: http://localhost:${port}`);
});
