const App = require('./config/webserver');
const Database = require('./config/database');
const mongoose = require('mongoose');

modules = {

    common: [ 'file', 'conf', 'activity', 'activityType', 'entity', 'experiment', 'experimentData', 'sensor', 'subject']

};

const Server = {
    start: async () => await App.start(modules)
};

Database.start(mongoose);
Server.start();
