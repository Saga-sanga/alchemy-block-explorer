import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useMemo, useState } from "react";
import BlockInfo from "./components/BlockInfo";

import "./App.css";
import Transactions from "./components/Transactions";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockWithTransactions, setBlockWithTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getBlockWithTransactions() {
      setBlockWithTransactions(
        await alchemy.core.getBlockWithTransactions(blockNumber)
      );
    }

    getBlockWithTransactions();
  }, [blockNumber]);

  useMemo(() => console.log(blockWithTransactions), [blockWithTransactions]);

  return (
    <div className="App">
      <span className="text-2xl">Block #{blockNumber}</span>
      {blockWithTransactions ? (
        <>
          <BlockInfo blockWithTransactions={blockWithTransactions} />
          <Transactions blockTransactions={blockWithTransactions.transactions}/>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
