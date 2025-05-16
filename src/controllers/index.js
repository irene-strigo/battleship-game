import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import {UsersService} from "../services/user.js";

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

const wsHandlers = {
    reg: usersService.register.bind(usersService),
}

wss.on('connection', (ws) => {
    ws.id = crypto.randomUUID();

    ws.on('message', (message) => {
        const req = JSON.parse(message);
        req.data = JSON.parse(req.data || '{}');

        const handler = wsHandlers[req.type]
        if (handler) {
            const result = handler(req.data, ws.id)
            ws.send(JSON.stringify({
                type: req.type,
                data: JSON.stringify(result),
                id: 0
            }));
        } else {
            const user = usersService.getUserByWsId(ws.id)
            console.log(`Received from user ${user.index}:`, req);
        }
    });
    ws.send('Secure connection established!');
});
