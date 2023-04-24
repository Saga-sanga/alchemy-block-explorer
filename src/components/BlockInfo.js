import { Link } from "react-router-dom";
import Search from "./Search";

function BlockInfo({ blockWithTransactions: blockInfo, setBlockNumber }) {
  let gasUsedPercent;
  if (blockInfo) {
    gasUsedPercent =
      (blockInfo.gasUsed.toString() / blockInfo.gasLimit.toString()) * 100;
  }

  return (
    <>
      <Search setBlockNumber={setBlockNumber} />
      {blockInfo ? (
        <div className="flex flex-col gap-4 bg-base-300 bg-opacity-60 py-6">
          <span className="text-2xl font-bold">Block #{blockInfo.number}</span>
          <div className="flex flex-col mx-10 text-left w-full mx-auto max-w-5xl">
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Block Height:</div>
              <div className="basis-3/4">{blockInfo.number}</div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Timestamp:</div>
              <div className="basis-3/4">
                {new Date(blockInfo.timestamp * 1000).toString()}
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Hash: </div>
              <div className="basis-3/4 flex gap-4">
                <div>{blockInfo.hash}</div>
                <a
                  className="text-blue-500 hover:text-blue-700"
                  href={`https://etherscan.io/block/${blockInfo.hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Etherscan
                </a>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Miner: </div>
              <div className="basis-3/4">{blockInfo.miner}</div>
            </div>
            <hr className="border-neutral-content mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Gas Used: </div>
              <div className="basis-3/4 flex items-center gap-8">
                <div className="">
                  {`${new Intl.NumberFormat().format(
                    blockInfo.gasUsed.toString()
                  )} (${gasUsedPercent.toFixed(2)}%)`}
                </div>
                <progress
                  className="progress w-56"
                  value={gasUsedPercent}
                  max="100"
                ></progress>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Gas Limit: </div>
              <div className="basis-3/4">
                {new Intl.NumberFormat().format(blockInfo.gasLimit.toString())}
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="basis-1/4">Transactions: </div>
              <div className="basis-3/4 text-blue-500 hover:text-blue-700 cursor-pointer">
                <Link to="/transactions">{`${blockInfo.transactions.length} transactions`}</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-base-300 bg-opacity-60 py-6">
          <div>Loading...</div>
          <progress className="progress w-56"></progress>
        </div>
      )}
    </>
  );
}

export default BlockInfo;
