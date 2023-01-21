import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
