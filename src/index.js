import express from "express"
import { PORT } from "../config/env.js";
import { matchRouter } from "./routes/matches.routes.js";
const app= express();
console.log(PORT)

app.use(express.json());


app.get('/', (req,res)=>{
    res.send("hello")
});
app.use('/matches', matchRouter)

app.listen(PORT, ()=>{
    console.log("App running on port"+ PORT)
});