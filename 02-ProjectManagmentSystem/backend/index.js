import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT ? +process.env.PORT : 7000;

app.listen(port, () => {
  console.log(`express app is running on http://localhost:${port}`);
});
