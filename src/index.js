import express from "express";
import http from "http";
import { PORT, HOST } from "../config/env.js";
import { matchRouter } from "./routes/matches.routes.js";
import { attachWebSocketServer } from "./ws/server.js";
import { homedir } from "os";
const app = express();
const server = http.createServer(app);
console.log(PORT);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/matches", matchRouter);

const {
  match: { broadcastMatchCreated, broadcastMatchUpdated ,broadcastMatchStarted},
 

} = attachWebSocketServer(server);

app.listen(PORT,HOST, () => {
    const baseUrl = HOST ==="0.0.0.0"? `http://localhost${PORT}` : `http://${HOST}:${PORT}`
  console.log("Server running on " + baseUrl);
    console.log("Websocker server running on " + baseUrl.replace('http', 'ws')+"/ws");

});
