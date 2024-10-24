import { TronWeb } from "tronweb";
import { getAbi } from "./utils.js";
import { config } from "./config.js";

const { privateKey, mUSDLockAddress, rebaseTokenAddress } = config;

const fullHost = "https://api.shasta.trongrid.io/";

export function createClient() {
  return new TronWeb({
    fullHost,
    privateKey,
  });
}

export async function createMUSDLock() {
  const tronWeb = new TronWeb({
    fullHost,
    privateKey,
  });

  return tronWeb.contract(getAbi("MUSDLock.json"), mUSDLockAddress);
}

export async function createRebaseToken() {
  const tronWeb = new TronWeb({
    fullHost,
    privateKey,
  });

  return tronWeb.contract(getAbi("RebaseToken.json"), rebaseTokenAddress);
}
