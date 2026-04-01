import {
  FieldSelection,
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { NetworkConfig } from "./utils/constants/network.constant";
import * as accountFactoryAbi from "./abi/accountFactory";

const fields = {
  log: {
    transactionHash: true,
  },
} satisfies FieldSelection;

export type Fields = typeof fields;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;

export function makeProcessor(
  config: NetworkConfig
): EvmBatchProcessor<Fields> {
  let processor = new EvmBatchProcessor();

  if (config.gatewaySqdUrl) {
    processor = processor.setGateway(config.gatewaySqdUrl);
  }

  processor = processor
    .setRpcEndpoint({
      url: config.rpcUrl,
      requestTimeout: config.requestTimeout,
    })
    .setRpcDataIngestionSettings({
      headPollInterval: config.headPollInterval,
    })
    .setPrometheusPort(config.prometheusPort)
    .setFinalityConfirmation(config.finalityConfirmation)
    .addLog({
      range: { from: config.accountFactory.startBlock },
      address: [config.accountFactory.address],
      topic0: [accountFactoryAbi.events.AccountCreated.topic],
    })
    .setFields({
      log: {
        transactionHash: true,
      },
    });

  return processor;
}
