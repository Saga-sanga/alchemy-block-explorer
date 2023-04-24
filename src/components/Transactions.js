import { Utils } from "alchemy-sdk";
import clipboard from "../assets/clipboard.svg";

function Transactions({ blockTransactions, handleTransactionClick }) {
  function copyHandler(e) {
    navigator.clipboard
      .writeText(e.currentTarget.value)
      .then(() => alert("Text copied to clipboard"))
      .catch((err) => console.error("Error: ", err));
  }

  let transactions;

  if (blockTransactions) {
    transactions = blockTransactions.transactions;
  }

  return transactions ? (
    <div>
      <h2 className="text-center text-3xl">Transactions</h2>
      <div className="overflow-x-auto max-w-5xl mx-auto">
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
            {transactions.map((transaction, i) => (
              <tr className="text-sm" key={i}>
                <th>{i + 1}</th>
                <td>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleTransactionClick}
                    value={transaction.hash}
                  >
                    {`${transaction.hash.slice(
                      0,
                      10
                    )}...${transaction.hash.slice(-10)}`}
                  </button>
                  <button
                    className="pl-1"
                    value={transaction.hash}
                    onClick={copyHandler}
                  >
                    <img alt="clipboard icon" src={clipboard} />
                  </button>
                </td>
                <td>{`${transaction.from.slice(
                  0,
                  8
                )}...${transaction.from.slice(-8)}`}</td>
                <td>
                  {transaction.to
                    ? `${transaction.to.slice(0, 8)}...${transaction.to.slice(
                        -8
                      )}`
                    : ``}
                </td>
                <td>{`${Utils.formatEther(
                  transaction.value.toString()
                )} Eth`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="bg-base-300 bg-opacity-60 py-6">
      <div>Loading...</div>
      <progress className="progress w-56"></progress>
    </div>
  );
}

export default Transactions;
