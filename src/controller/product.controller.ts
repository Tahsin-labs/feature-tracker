// import type { IncomingMessage, ServerResponse } from "http";

// export const productController = (res: IncomingMessage, req: ServerResponse) => {
//     const url = req.url;
//     const method = req.method;

//     if(url=== "/products" && method ==="GET"){
//          res.writeHead(200, { "content-type": "application/json" })
//     res.end(JSON.stringify({ message: "this is product route", data:{} }))
//     }
// }



import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../type/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    // console.log("request",req)
    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    // console.log(urlParts)
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;



    //   Get all products 
    if (url === "/products" && method === "GET") {

        // const products =[
        //     {
        //         id:1,
        //         name:"product -3"
        //     }
        // ]
        const products = readProduct();

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "this is product route", data: products }));
    }



    else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        console.log(product)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "products found", data: product }));
    }
    else if (method === "POST" && url === '/products') {
    
        const body = await parseBody(req)
        console.log(body)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "products created ok "}));
    }




};