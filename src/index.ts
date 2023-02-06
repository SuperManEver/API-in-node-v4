import * as dotenv from "dotenv";
dotenv.config();

import { PORT } from "./config";
import server from "./server";

server.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
