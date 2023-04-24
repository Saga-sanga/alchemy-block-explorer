import ethLogo from "../assets/ethereum.svg";

function Layout({ children }) {
  return (
    <>
      <div className="navbar bg-transparent">
        <a
          href="/"
          className="btn btn-ghost hover:bg-transparent normal-case text-xl"
        >
          <div className="flex items-center gap-2">
            <img src={ethLogo} width={14} height={14} alt="Ethereum Logo" />{" "}
            BlockExplorer
          </div>
        </a>
      </div>
      {children}
      <footer className="mt-12 mb-4">
        <div className="text-center">
          Created By{" "}
          <a
            className="font-bold hover:underline"
            href="https://recksonk.in"
            target="_blank"
            rel="noreferrer"
          >
            Reckson Khiangte
          </a>
        </div>
      </footer>
    </>
  );
}

export default Layout;
