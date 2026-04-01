import { TypeormDatabase } from "@subsquid/typeorm-store";
import { makeProcessor } from "./processor";
import { networksConfigs } from "./utils/constants/network.constant";
import { assert } from "console";
import { accountFactoryLogsHandlers } from "./utils/helpers/handlers.helper";
import { EntityManager } from "./utils/EntityManager";

assert(
  networksConfigs.hasOwnProperty(process.argv[2]),
  `Processor executable takes one argument - a network string ID - ` +
    `that must be in ${JSON.stringify(Object.keys(networksConfigs))}. Got "${
      process.argv[2]
    }".`
);

const network = process.argv[2];
export const config = networksConfigs[network];

const processor = makeProcessor(config);

const database = new TypeormDatabase({
  supportHotBlocks: true,
  stateSchema: `${config.chainTag}_processor`,
  isolationLevel: "READ COMMITTED",
});

let handleOnce = false;

processor.run(database, async (ctx) => {
  const entities = new EntityManager();

  if (!handleOnce) {
    console.log("version 1.0.0");
    handleOnce = true;
  }

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address === config.accountFactory.address) {
        const handler = accountFactoryLogsHandlers.get(log.topics[0]);
        if (handler) {
          await handler(ctx, log, entities);
        }
      }
    }
  }

  await entities.upsertAll(ctx.store);
});
