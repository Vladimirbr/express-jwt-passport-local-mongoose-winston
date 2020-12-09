const mongoose = require("mongoose");

const mongoConf = require("../configs/config").mongo;

mongoose.Promise = global.Promise;

const logger = require("../logger/logger");

// Create the database connection
const connectToDb = async () => {
  try {
    await mongoose.connect(mongoConf.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: mongoConf.poolSize,
    });
  } catch (err) {
    logger.log("error", "[DB coonector] - Mongoose create the database connection error %s", err);
  }
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.log("info", "[DB coonector] - Mongoose default connection open to %s", mongoConf.uri);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.log("error", "[DB coonector] - Mongoose default connection error: %s", err);
});

//When mongoose reconnected
mongoose.connection.on("reconnected", () => {
  logger.log("warn", "[DB coonector] - Mongoose Connection Reestablished");
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.log("info", "[DB coonector] - Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.log("warn", "[DB coonector] - Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

module.exports.connectToDb = connectToDb;
