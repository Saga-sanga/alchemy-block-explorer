function Layout({ children }) {
  return (
    <>
      <div className="navbar bg-base-100">
        <a
          href="/"
          className="btn btn-ghost hover:bg-transparent normal-case text-xl"
        >
          BlockExplorer
        </a>
      </div>
      {children}
    </>
  );
}

export default Layout;
