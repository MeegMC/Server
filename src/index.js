require('dotenv').config();
const { env } = process;

const { Logger } = require('euberlog');
const log = new Logger(__filename);

const express = require('express');
const app = express();

app.use((req, res, next) => {
    log.debug(`${req.method} ${req.url}`);
    next();
});

app.listen(env.PORT, () => {
    log.info(`App listening on port ${env.PORT}`)
});