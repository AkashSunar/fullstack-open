const Search= ({search,handleSearch}) => {
  return <>
      <div>
        find countries
        <input type="text" value={search} onChange={handleSearch} />
      </div>
      </>  
}
export default Search;