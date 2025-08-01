import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocket, WebSocketServer } from 'ws';



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({port:4000});

wss.on("connection",(ws:WebSocket)=>{
    console.log("New Client Connected");
});

wss.on("message",(ws)=>{
    console.log("Recieved a message from the client");
    wss.clients.forEach((client)=>{
        if((client !== ws) && (client.readyState === WebSocket.OPEN)){
            client.send((ws));
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("Running on port "+ PORT);
})