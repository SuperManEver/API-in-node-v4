import * as express from "express";
import * as morgan from "morgan";

import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: any, res) => {
  res.status(200);
  res.json({ msg: "hello" });
});

app.use("/api", protect, router);

app.post("/signup", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, that on us" });
  }
});

export default app;
