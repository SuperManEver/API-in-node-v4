import * as express from "express";
import * as morgan from "morgan";

import router from "./router";
import { protect } from "./modules/auth";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: any, _, next) => {
  req.shhh_secret = "doggy";

  next();
});

app.get("/", (req: any, res) => {
  console.log(req.shhh_secret);

  res.status(200);
  res.json({ msg: "hello" });
});

app.use("/api", protect, router);

export default app;
