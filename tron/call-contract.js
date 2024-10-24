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
  const approveTx = await rebaseToken
    .approve(mUSDLockAddress, "1000000000000000000")
    .send();

  await waitForTronTransaction(client, approveTx);

  const payload = encodeLockPayload({
    version: 1,
    duration: 3,
  });

  const musdLock = await createMUSDLock();

  const lockTx = await musdLock
    .lock(1_000_000_000_000_000, `0x${payload}`)
    .send();

  await waitForTronTransaction(client, lockTx);
}

main().catch(console.error);
