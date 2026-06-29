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
import { insertProduct, readProduct } from "../service/product.service";
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

    //  get single product by id 

    else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        console.log(product)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "products found", data: product }));
    }


    // create a product by post method
    else if (method === "POST" && url === '/products') {

        const body = await parseBody(req)
        console.log(body)
        const products = readProduct();
        const newProduct = {
            id: Date.now(),
            ...body,
        }
        // console.log(newProduct)
        products.push(newProduct)
        console.log(products)
        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "products created ok ", data: products }));
    }


    // update products ...................

    else if (method === "PUT" && id !== null) {

        const body = await parseBody(req)
        const products = readProduct()
        const index = products.findIndex((p: IProduct) => p.id === id)

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "product not found  ", data: null }));
        }


        // console.log(products[index]);

        products[index] = { id: products[index].id, ...body }


        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "product updated successfully  ", data: products[index] }));

    }


    //    delete products 

    else if (method === "DELETE" && id !== null) {
        const products = readProduct() // to read the products 
        const index = products.findIndex((p: IProduct) => p.id === id)

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "product not found  ", data: null }));
        }

        products.splice(index,1);
        // console.log(products)

        insertProduct( products)
          res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "product deleted successfully  ", data: null }));


    }


};