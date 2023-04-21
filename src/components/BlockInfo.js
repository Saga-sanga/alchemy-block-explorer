function BlockInfo({ blockWithTransactions: blockInfo }) {

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-4">
        <div className="col-md-3">Block Height:</div>
        <div className="col-md-9">{blockInfo.number}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="col-md-3">Timestamp:</div>
        <div className="col-md-9">{new Date(blockInfo.timestamp).toString()}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="col-md-3">Hash: </div>
        <div className="col-md-9">{blockInfo.hash}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="col-md-3">Miner: </div>
        <div className="col-md-9">{blockInfo.miner}</div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="col-md-3">Transactions: </div>
        <div className="col-md-9">{`${blockInfo.transactions.length} transactions`}</div>
      </div>
    </div>
  )
}

export default BlockInfo;