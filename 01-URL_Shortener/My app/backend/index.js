import "dotenv/config";
import express from "express";
import adminRoutes from "./routes/admin/admin.route.js";
import userRoutes from "./routes/user/user.route.js";
import urlRoutes from "./routes/url/url.route.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/shorten", urlRoutes);

app.listen(port, () => {
  console.log(`server is live on: http://localhost:${port}`);
});
