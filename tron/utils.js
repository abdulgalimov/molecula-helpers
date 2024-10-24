import fs from "node:fs";

export function encodeLockPayload(data) {
  const string = JSON.stringify(data);

  const buffer = Buffer.from(string, "utf-8");

  return buffer.toString("hex");
}

export function getAbi(abiFilename) {
  const abiStr = fs.readFileSync(`./tron/abi/${abiFilename}`).toString();

  return JSON.parse(abiStr);
}

function timeout(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function waitForTronTransaction(tronWeb, transactionId, silent) {
  let info;
  let data;
  try {
    [info, data] = await Promise.all([
      tronWeb.trx.getTransactionInfo(transactionId),
      tronWeb.trx.getTransaction(transactionId),
    ]);
  } catch (error) {
    console.debug("Failed to get the transaction details with error:", error);
  }

  if (info && "receipt" in info && "result" in info.receipt) {
    if (!silent) {
      console.debug("The awaited transaction info:", info);
    }

    if (info.receipt.result !== "SUCCESS") {
      if (info.receipt.result === "OUT_OF_ENERGY") {
        throw new Error("TRON_ERROR: Out of energy");
      }
      throw new Error("Transaction has't succeeded");
    }

    return info;
  }

  if (
    data &&
    "ret" in data &&
    data.ret &&
    data.ret.length > 0 &&
    "contractRet" in data.ret[0]
  ) {
    if (!silent) {
      console.debug("The awaited transaction data:", data);
    }

    if (data.ret[0].contractRet !== "SUCCESS") {
      if (data.ret[0].contractRet === "OUT_OF_ENERGY") {
        throw new Error("TRON_ERROR: Out of energy");
      }
      throw new Error("Transaction has't succeeded");
    }
    return data;
  }

  await timeout(3000);

  return waitForTronTransaction(tronWeb, transactionId);
}
