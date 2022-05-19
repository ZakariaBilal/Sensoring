let config = require('./db');


const start = mongoose => {

    mongoose.Promise = global.Promise;

    let connection = async () => {
        try {
            await mongoose.connect(config.url, config.options);
        } catch (e) {
            console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
            setTimeout(connection, 1000);
        }
    };

    mongoose.connection.on("open", () => console.log('Connected to mongo'));
    mongoose.connection.on("error", err => {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connection, 4000);
    })
    mongoose.connection.on("disconnected", err => console.warn("Disconnected from mongo", err))
    mongoose.connection.on("reconnected", () => console.info("Reconnected to mongo"))

    connection();
}

module.exports.start = (mongoose) => start(mongoose);
