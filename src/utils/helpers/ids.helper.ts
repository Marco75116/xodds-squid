import { config } from "../../main";

export const getTransferId = (logId: string) => {
  return `${config.chainTag}-${logId}`;
};
