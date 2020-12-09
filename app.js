/**
 * Module dependencies.
 */
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const httpErrors = require("http-errors");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");

const connectToDb = require("./db/connect").connectToDb;
const logger = require("./logger/logger");
const getDurationInMilliseconds = require("./utils/utils").getDurationInMilliseconds;

// Imports routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

// Passport Config
require("./passport/passport")(passport);

// Create the Express application
const app = express();

// Connect to mongo db
connectToDb();

// Using the logger and its configured transports, to save the logs created by Morgan and combined with Winston logger
const myStream = {
  write: (text) => {
    logger.info(text);
  },
};
app.use(morgan("combined", { stream: myStream }));

//Calculate req res time
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.log("debug", `[App] - ${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
  });

  res.on("close", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.log("debug", `[App] - ${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
  });

  next();
});

// Allows our other application to make HTTP requests to Express application
app.use(cors());

// Secure your Express apps by setting various HTTP headers
app.use(helmet());
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Compress responses
app.use(compression());

// Allow express parse req url and json body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// This will initialize the passport object on every request
app.use(passport.initialize());

/**
 * -------------- ROUTES ----------------
 */
app.use("/", indexRouter);
app.use("/auth", authRouter);
// Every req to user route must be authenticated by jwt
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  logger.log("debug", "[App] - Error Handler", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
