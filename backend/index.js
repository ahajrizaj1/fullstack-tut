import express, { response } from "express";
import { PORT, monogDBURL } from "./config.js";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

///  middleware for handling cors policy
//Option 1: Allow all origins with default cors(*)
app.use(cors());

// Option 2: Allow costum origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to the main page");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

app.use("/users", usersRoute);

mongoose
  .connect(monogDBURL)
  .then(() => {
    console.log("App is connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
