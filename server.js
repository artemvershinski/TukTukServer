const http = require('http');

const PORT = process.env.PORT || 8080;

// Храним последнее касание
let lastTouch = null;

const server = http.createServer((req, res) => {
    // CORS для запросов из приложения
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // GET — получить последнее касание
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ touch: lastTouch }));
        if (lastTouch) {
            console.log('📤 Отдано:', lastTouch);
        }
    }
    
    // POST — отправить касание
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                lastTouch = data;
                console.log('📥 Получено:', JSON.stringify(data));
                res.writeHead(200);
                res.end('ok');
            } catch (e) {
                res.writeHead(400);
                res.end('bad json');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`🔌 Сервер на порту ${PORT}`);
});
