import { Utils } from "alchemy-sdk";
import { alchemy } from "../App";
import { useEffect, useState } from "react";

function TransactionDetails({ txnHash }) {
  const [transactionReceipt, setTransactionReceipt] = useState(null);

  console.log(txnHash);

  useEffect(() => {
    let isCancelled = false;

    alchemy.core.getTransactionReceipt(txnHash).then((res) => {
      if (!isCancelled) {
        setTransactionReceipt(res);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [txnHash]);

  console.log(transactionReceipt);
  return transactionReceipt ? (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">Transaction Details</span>
      <div className="flex flex-col mx-10 text-left w-full mx-auto max-w-5xl">
        <div className="flex gap-2 mb-4">
          <div className="basis-1/4">Transaction Hash:</div>
          <div className="basis-3/4">{transactionReceipt.transactionHash}</div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="basis-1/4">Status:</div>
          <div className="basis-3/4">
            {transactionReceipt.status ? (
              <div className="badge badge-success">Success</div>
            ) : (
              <div className="badge badge-warning">Failure</div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="basis-1/4">Block:</div>
          <div className="basis-3/4 flex gap-4 items-center">
            {transactionReceipt.blockNumber}
            <div className="badge badge-outline">
              {transactionReceipt.confirmations} Block Confirmations
            </div>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="basis-1/4">From:</div>
          <div className="basis-3/4">{transactionReceipt.from}</div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="basis-1/4">To:</div>
          <div className="basis-3/4">{transactionReceipt.to}</div>
        </div>
        <hr className="mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="basis-1/4">Gas Price:</div>
          <div className="basis-3/4">
            {Utils.formatUnits(
              transactionReceipt.effectiveGasPrice.toString(),
              "gwei"
            )}{" "}
            Gwei
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div>Loading...</div>
      <progress className="progress w-56"></progress>
    </div>
  );
}

export default TransactionDetails;
