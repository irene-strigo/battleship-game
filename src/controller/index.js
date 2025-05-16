import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';

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


/*
const wsHandlers = {
    reg: userService.reg
}
*/

wss.on('connection', (ws) => {
    ws.on('message', (message) => {

        const req = JSON.parse(message);
        req.data = JSON.parse(req.data);

        /*const handler = wsHandlers[req.type]
        if (!handler) {
            throw new Error(`Bla`);
        }
        const res = handler(req.data)
        res.data = JSON.stringify(res.data)
        ws.send(JSON.stringify(res))
*/


        console.log(`Received:`, req);

        ws.send(JSON.stringify({
            type: req.type,
            data: JSON.stringify({
                name: req.data.name,
                index: 1,
                error: false,
                errorText: ''
            }),
            id: 0
        }));
    });
    ws.send('Secure connection established!');
});
