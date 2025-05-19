import { httpServer } from "./src/controllers/index.js";

const HTTP_PORT = 3000;

console.log(`Start server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
