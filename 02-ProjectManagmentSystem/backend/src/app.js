import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

// basic configurations (plugins)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credential: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);

// routes
app.get("/", (req, res) => {
  res.send(`express app is online. this is home route`);
});

app.get("/instagram", (req, res) => {
  res.send(`express app is online. this is instagram route`);
});

export default app;
