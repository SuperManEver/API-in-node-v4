import * as express from "express";
import * as morgan from "morgan";

import router from "./router";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ msg: "hello" });
});

app.use("/api", router);

export default app;
