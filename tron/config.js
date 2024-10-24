import dotenv from "dotenv";

dotenv.config();

const { TRON_PRIVATE_KEY, TRON_MUSD_LOCK_ADDRESS, TRON_REBASE_TOKEN_ADDRESS } =
  process.env;

export const config = {
  privateKey: TRON_PRIVATE_KEY,
  mUSDLockAddress: TRON_MUSD_LOCK_ADDRESS,
  rebaseTokenAddress: TRON_REBASE_TOKEN_ADDRESS,
};
