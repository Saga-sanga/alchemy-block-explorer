import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useMemo, useState } from "react";
import BlockInfo from "./components/BlockInfo";
import { Route, Switch, useHistory } from "react-router-dom";

import "./App.css";
import Transactions from "./components/Transactions";
import TransactionDetails from "./components/TransactionDetails";
import Layout from "./components/Layout";

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
  const [txnHash, setTxnHash] = useState("");

  const history = useHistory();

  function handleTransactionClick(event) {
    event.preventDefault();

    console.log(event.currentTarget.value);
    setTxnHash(event.currentTarget.value);
    history.push("/txn-details");
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

  return (
    <div className="App">
      {/* Main content body */}
      <main className="flex flex-col gap-8 min-h-screen bg-[url('./assets/ethereum.svg')] bg-cover bg-fixed bg-center bg-[length:80%_80%] bg-no-repeat">
        <Layout setBlockNumber={setBlockNumber}>
          <Switch>
            <Route path="/txn-details">
              <TransactionDetails txnHash={txnHash} />
            </Route>
            <Route path="/transactions">
              <Transactions
                blockTransactions={blockWithTransactions}
                handleTransactionClick={handleTransactionClick}
              />
            </Route>
            <Route exact path="/">
              <BlockInfo
                blockWithTransactions={blockWithTransactions}
                setBlockNumber={setBlockNumber}
              />
            </Route>
          </Switch>
        </Layout>
      </main>
    </div>
  );
}

export default App;
