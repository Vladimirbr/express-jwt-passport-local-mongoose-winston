import "./pre-start";

import container from "./configs/awilix";

import { preStart } from "./pre-start/index";
import Server from "./server";

// Server(container.cradle);

preStart()
  .then(() => {
    new Server(container.cradle);
  })
  .catch((e) => {
    container.cradle.logger.info(`[index] - Failed on pre start ${e}`);
    process.exit(1);
  });
