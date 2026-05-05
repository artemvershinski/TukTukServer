const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', function connection(ws) {
    clients.push(ws);
    console.log(`👤 Клиент подключился. Всего: ${clients.length}`);
    
    ws.on('message', function incoming(data) {
        console.log(`📤 Получено: ${data}`);
        clients.forEach(function(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });
    
    ws.on('close', function() {
        clients = clients.filter(c => c !== ws);
    });
});

console.log(`🔌 Сервер запущен на порту ${PORT}`);
