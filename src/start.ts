#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from "http";

import app from "./app";
import logger from "./logger/logger";
import { PORT } from "./configs/env";

import { preStart } from "./pre-start/index";

class Server {
  public server;

  public port;

  public logger;

  constructor() {
    this.logger = logger;

    /**
     * Get port from environment and store in Express.
     */
    this.port = this.normalizePort(PORT);

    app.set("port", this.port);

    /**
     * Create HTTP server.
     */
    this.server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    this.server.listen(this.port);
    /**
     *
     * Event listener for HTTP server "error" event.
     */
    this.server.on("error", this.onError);
    this.server.on("listening", this.onListening.bind(this));
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  private normalizePort(val: string): number | boolean | string {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  private onError(error: any): void {
    if (error.syscall !== "listen") {
      throw error;
    }

    let bind = typeof this.port === "string" ? "Pipe " + this.port : "Port" + this.port;

    switch (error.code) {
      case "EACCES":
        console.error(`[start] - ${bind} requires elevated privileges`);
        process.exit(1);

      case "EADDRINUSE":
        console.error(`[start] - ${bind} is already in use`);
        process.exit(1);

      default:
        throw error;
    }
  }

  public onListening(): void {
    this.logger.log("info", `[start] - Listening on ${JSON.stringify(this.server.address())}`);
  }
}

preStart()
  .then(() => {
    new Server();
  })
  .catch((e) => {
    logger.log("info", `[start] - Failed on pre start ${e}`);
    process.exit(1);
  });
