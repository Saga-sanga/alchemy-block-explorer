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
    async function getBlockNumber() {
      setBlockWithTransactions(
        await alchemy.core.getBlockWithTransactions(parseInt(blockNumber))
      );
    }

    getBlockNumber();
  }, [blockNumber]);

  // useEffect(() => {
  //   async function getBlockWithTransactions() {
  //     setBlockWithTransactions(
  //       await alchemy.core.getBlockWithTransactions(blockNumber)
  //     );
  //   }

  //   getBlockWithTransactions();
  // }, [blockNumber]);

  useMemo(() => console.log(blockWithTransactions), [blockWithTransactions]);

  return (
    <div className="App">
      <div className="navbar bg-base-100">
        <a
          href="/"
          className="btn btn-ghost hover:bg-transparent normal-case text-xl"
        >
          BlockExplorer
        </a>
      </div>
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

        {blockWithTransactions ? (
          <>
            <BlockInfo blockWithTransactions={blockWithTransactions} />
            {/* <Transactions blockTransactions={blockWithTransactions.transactions}/> */}
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
