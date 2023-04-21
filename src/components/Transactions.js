function Transactions({ blockTransactions: transactions }) {
  console.log(transactions[0])
  return (
    <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Hash</th>
        <th>From</th>
        <th>To</th>
        <th>Nonce</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>

      {transactions.map((transaction, i) => 
        <tr key={i}>
          <th>{i + 1}</th>
          <td>{transaction.hash}</td>
          <td>{transaction.from}</td>
          <td>{transaction.to}</td>
          <td>{transaction.nonce}</td>
          <td></td>
        </tr>)}
  
    </tbody>
  </table>
</div>
  );
}

export default Transactions;