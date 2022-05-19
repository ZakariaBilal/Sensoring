const express = require('express');
const app = express();
const Env = require('../env');
const Init = require('../../controllers/init');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const timeout = require('connect-timeout');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

app.use(bodyParser.json({ limit: '80mb' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));
app.use(timeout(4800000));
app.use((req, res, next) => {
    if (!req.timedout) next();
});
app.use(cors());

const startApp = async modules => {
    try {
        await Init.config();
        Env.setGlobal();

        // require models
        Object.entries(modules).forEach(module => {
            module[1].forEach((element) => {
                try {
                    require(`../../app/${module[0]}/${element}/model`);
                } catch (e) {
                    if (e.code !== 'MODULE_NOT_FOUND') throw e;
                }
            });
        });

        // require routes separately to avoid Missing Schema Error
        Object.entries(modules).forEach(module => {
            module[1].forEach((element) => {
                try {
                    require(`../../app/${module[0]}/${element}`)(app);
                } catch (e) {
                    if (e.code !== 'MODULE_NOT_FOUND') throw e;
                }
            });
        });

        if (process.env.RUN_PASTILLE == 1) require("../../app/pdh/helper/cron")();

        const router = express.Router();

        router.use((req, res, next) => {
            next();
        });

        const port = global.CONFIG.server.node.port || 3500;
        const server = app.listen(port);
        server.setTimeout(480000);
        console.log(`App on port ${port}`);

        if (process.env.NODE_ENV === 'production') console.log = () => { };

    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports.start = startApp;
