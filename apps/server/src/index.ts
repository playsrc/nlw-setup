import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send({ greetings: "Hello from the server!" });
});

app.get("/me", async (req, res) => {
  const apiRes = await fetch("https://randomuser.me/api/");
  const user = await apiRes.json();

  res.status(200).send(user);
});

app.use((req, res) => {
  res.status(404).send({ error: "Route not found!" });
});

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
