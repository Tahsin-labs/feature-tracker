import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method
    if (url === "/" && method === "GET") {
        // console.log("this is rout rout")
        res.writeHead(200, { "content-type": "application/json" })   // --- this is for content type
        res.end(JSON.stringify({ message: "this is root route" }))   //----this line for sending data, the data should stringify 
    }
    else if (url?.startsWith("/products")) {
       productController(req,res)
    } else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "route not found" }))
    }




    
}