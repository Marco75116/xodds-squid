import { config } from "../../main";

export const getTransferId = (logId: string) => {
  return `${config.chainId}-${logId}`;
};

export const getAccountId = (logId: string) => {
  return `${config.chainId}-${logId}`;
};

export const getVaultConfigId = (logId: string) => {
  return `${config.chainId}-${logId}`;
};
