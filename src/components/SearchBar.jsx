function SearchBar({ search, setSearch, sortStudents, }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search student by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="sort-btn"
        onClick={sortStudents}
      >
        Sort A-Z
      </button>
    </div>
  );
}

export default SearchBar;