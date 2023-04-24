function Search({ setBlockNumber }) {
  function handleBlockChange(event) {
    event.preventDefault();
    const input = document.getElementById("search").value;

    console.log(input);
    setBlockNumber(input);
  }

  return (
    <form className="flex gap-2 justify-center" onSubmit={handleBlockChange}>
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
  );
}

export default Search;
