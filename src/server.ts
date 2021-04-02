#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from "http";

import { ILog } from "./interfaces/log";

import app from "./app";

export default class Server {
  //private app;

  private server;

  private readonly port;

  private logger;

  constructor({ serverConfig, logger }: { serverConfig: any; logger: ILog }) {
    //this.app = app.app;

    this.logger = logger;

    /**
     * Get port from environment and store in Express.
     */
    this.port = serverConfig.PORT;

    app.set("port", this.port);

    /**
     * Create HTTP server.
     */
    this.server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    this.server.listen(this.port, serverConfig.HOST);
    /**
     *
     * Event listener for HTTP server "error" event.
     */
    this.server.on("error", this.onError);
    this.server.on("listening", this.onListening.bind(this));
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
    this.logger.info(`[start] - Listening on ${JSON.stringify(this.server.address())}`);
  }
}
