import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ data: "Hello Dave" });
});

export default app;
