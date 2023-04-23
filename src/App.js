import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useMemo, useState } from "react";
import BlockInfo from "./components/BlockInfo";

import "./App.css";
import Transactions from "./components/Transactions";
import TransactionDetails from "./components/TransactionDetails";

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
export const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState(0);
  const [blockWithTransactions, setBlockWithTransactions] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [txnHash, setTxnHash] = useState("");

  function toggleTransactions() {
    setShowTransactions(!showTransactions);
  }

  function handleTransactionClick(event) {
    event.preventDefault();

    console.log(event.currentTarget.value);
    setTxnHash(event.currentTarget.value);
    setShowTransactionDetails(true);
    // Push Route to transaction details, pass transaction details to Component
  }

  function handleBlockChange(event) {
    event.preventDefault();
    const input = document.getElementById("search").value;

    console.log(input);
    setBlockNumber(input);
  }

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    alchemy.core.getBlockWithTransactions(parseInt(blockNumber)).then((res) => {
      if (!isCancelled) {
        setBlockWithTransactions(res);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [blockNumber]);

  useMemo(() => console.log(blockWithTransactions), [blockWithTransactions]);

  // TODO: Add Route to components and Add loading across components

  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <a
          href="/"
          className="btn btn-ghost hover:bg-transparent normal-case text-xl"
        >
          BlockExplorer
        </a>
      </div>

      {/* Main content body */}
      <main className="flex flex-col gap-8">
        <form
          className="flex gap-2 justify-center"
          onSubmit={handleBlockChange}
        >
          <input
            id="search"
            type="text"
            placeholder="Enter Block Number"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {showTransactionDetails ? (
          <TransactionDetails txnHash={txnHash} />
        ) : (
          <></>
        )}

        {blockWithTransactions ? (
          <>
            <BlockInfo
              blockWithTransactions={blockWithTransactions}
              toggleTransactions={toggleTransactions}
            />

            {showTransactions ? (
              <Transactions
                blockTransactions={blockWithTransactions.transactions}
                handleTransactionClick={handleTransactionClick}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <div>
            <div>Loading...</div>
            <progress className="progress w-56"></progress>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
