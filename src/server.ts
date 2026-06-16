import { createServer, IncomingMessage, Server } from "http";

// to create a server
const server:Server = createServer((req:IncomingMessage ,res)=>{
  console.log(req)
})

server.listen(5000,()=>{
    console.log("server is running on the post 5000")
})