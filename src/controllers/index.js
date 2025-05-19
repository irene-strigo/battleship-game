import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import {UsersService} from "../services/users.js";
import {RoomsService} from "../services/rooms.js";

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});
const wss = new WebSocketServer({ server: httpServer });

const usersService = new UsersService()
const roomsService = new RoomsService()

const wsHandlers = {
    reg: [usersService.register.bind(usersService), roomsService.updateRoom.bind(roomsService)],
    create_room: [roomsService.createRoom.bind(roomsService), roomsService.addUserToRoom.bind(roomsService), roomsService.updateRoom.bind(roomsService)],
    add_user_to_room: [roomsService.addUserToRoom.bind(roomsService), roomsService.updateRoom.bind(roomsService)]
}

wss.on('connection', (ws) => {
    ws.id = crypto.randomUUID();

    ws.on('message', async (message) => {
        const req = JSON.parse(message);
        req.data = JSON.parse(req.data || '{}');

        const handlers = wsHandlers[req.type]
        if (handlers) {
            for (const handler of handlers) {
                const result = await handler(req.data, ws.id)
                ws.send(JSON.stringify(result));
            }
        } else {
            const user = usersService.getUserByWsId(ws.id)
            console.log(`Received from user ${user.index}:`, req);
        }
    });
    ws.send('Secure connection established!');
});
