require('dotenv').config();
const { env } = process;

const { Logger } = require('euberlog');
const log = new Logger(__filename);

const express = require('express');
const app = express();

require('express-ws')(app);

app.use((req, res, next) => {
    log.debug(`${req.method} ${req.url}`);
    next();
});

app.get('/ping', (req, res) => {
    res.json({
        ok: true,
        version: '1.0.0'
    })
});

app.ws('/game', (ws, req) => {
    log.debug(`[WS] Connect`);

    ws.send(JSON.stringify(['HELLO', '1.0.0']));

    ws.on('message', (data) => {
        ws.send("hello "+String(data)+"!");
    });
    ws.on('close', () => {
        log.debug(`[WS] Disconnect`);
    });
    ws.send("hello!");
});

app.listen(env.PORT, () => {
    log.info(`App listening on port ${env.PORT}`)
});