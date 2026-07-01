import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/routes";
import config from "./config";

// to create a server
const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
   routeHandler(req,res)
  }
)




server.listen(config.port, () => {
    console.log(`server is running on the post ${config.port}`)
})