import { encodeLockPayload, getAbi, waitForTronTransaction } from "./utils.js";
import {
  createClient,
  createMUSDLock,
  createRebaseToken,
} from "./contracts.js";
import { config } from "./config.js";

const { mUSDLockAddress } = config;

const client = createClient();

async function main() {
  const rebaseToken = await createRebaseToken();
  console.log("approve");
  const approveTx = await rebaseToken
    .approve(mUSDLockAddress, "1000000000000000000")
    .send();

  console.log("approveTx", approveTx);
  await waitForTronTransaction(client, approveTx);

  const payload = encodeLockPayload({
    version: 1,
    duration: 90,
  });

  const musdLock = await createMUSDLock();

  console.log("lock");
  const lockTx = await musdLock
    .lock("100000000000000000", `0x${payload}`)
    .send();
  console.log("lockTx", lockTx);

  await waitForTronTransaction(client, lockTx);
}

main().catch(console.error);
