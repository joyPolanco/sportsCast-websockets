import express from "express"
import { PORT } from "../config/env.js";
const app= express();
console.log(PORT)

app.use(express.json());




app.listen(PORT, ()=>{
    console.log("App running on port"+ PORT)
});