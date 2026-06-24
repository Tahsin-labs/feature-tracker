import path from "path"
import fs from "fs";
import { constants } from "buffer";
const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct=()=> {
    const products = fs.readFileSync(filePath, "utf-8"); 
    // console.log(JSON.parse(products));
    return JSON.parse(products);
}

export const insertProduct =(payload:any)=>{
    console.log(JSON.stringify(payload))
    fs.writeFileSync(filePath, JSON.stringify(payload))
}