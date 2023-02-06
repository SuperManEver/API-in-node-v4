import * as express from "express";
import * as morgan from "morgan";

import router from "./router";
import { protect } from "./modules/auth";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: any, res) => {
  res.status(200);
  res.json({ msg: "hello" });
});

app.use("/api", protect, router);

export default app;
