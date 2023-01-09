/**
 * main
 */

import server from "./server.js";

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
