import { Utils } from "alchemy-sdk";

function Transactions({ blockTransactions: transactions }) {
  // console.log(transactions[0])
  return (
    <>
      <h2 className="text-center text-3xl">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Txn Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>

            {transactions.map((transaction, i) => 
              <tr className="text-sm" key={i}>
                <th>{i + 1}</th>
                <td>{transaction.hash}</td>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>{`${Utils.formatEther(transaction.value.toString())} Eth`}</td>
              </tr>)}
        
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transactions;