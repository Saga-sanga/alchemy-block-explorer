function BlockInfo({ blockWithTransactions: blockInfo }) {

  return (
    <div className="flex flex-col mx-10 text-left">
      <div className="flex gap-2 mb-4">
        <div className="basis-1/4">Block Height:</div>
        <div className="basis-3/4">{blockInfo.number}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="basis-1/4">Timestamp:</div>
        <div className="basis-3/4">{new Date(blockInfo.timestamp).toString()}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="basis-1/4">Hash: </div>
        <div className="basis-3/4">{blockInfo.hash}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="basis-1/4">Miner: </div>
        <div className="basis-3/4">{blockInfo.miner}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="basis-1/4">Transactions: </div>
        <div className="basis-3/4">{`${blockInfo.transactions.length} transactions`}</div>
      </div>
    </div>
  )
}

export default BlockInfo;