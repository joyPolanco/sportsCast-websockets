import { WebSocket, WebSocketServer } from "ws";
import { maxSize } from "zod";

function sendJson(socket, payload) {
  if (socket.readyState != WebSocket.OPEN) return;
  socket.send(JSON.stringify(payload));
}

function broadCast(wss, payload) {
  for (const client of wss.clients) {
    if (client.readyState != WebSocket.OPEN) continue;
    client.send(JSON.stringify(payload));
  }
}
export function attachWebSocketServer(server) {
  const wss = new WebSocketServer({
    server,
    path: "/ws",
    maxSize: 1024 * 1024,
  });


  wss.on('connection', (socket)=>{
    sendJson(socket, {type:'welcome'});

    socket.on("error", console.error)

  })

  function broadcastMatchCreated(match){
    broadCast(wss,{type:'match_created', data:match})
  }


   function broadcastMatchUpdated(match){
    broadCast(wss,{type:'match_updated', data:match})
  }
    function broadcastMatchStarted(match){
    broadCast(wss,{type:'match_started', data:match})
  }

  return{
    match: {
      created: broadcastMatchCreated,
      updated: broadcastMatchUpdated,
      started: broadcastMatchStarted
    }
  }
}
