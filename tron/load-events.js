import { createRebaseToken } from "./contracts.js";

import { config } from "./config.js";

const { rebaseTokenAddress } = config;

async function main() {
  const rebaseToken = await createRebaseToken();
  const events = await rebaseToken.tronWeb.event.getEventsByContractAddress(
    rebaseTokenAddress,
    {
      eventName: "TransferShares",
      sort: "-block_timestamp",
    },
  );
  console.log("events", JSON.stringify(events, null, 2));
}

main().catch(console.error);
