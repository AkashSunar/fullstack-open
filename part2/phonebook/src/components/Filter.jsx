const Filter = ({ handleFilterName }) => {
  return (
    <form>
      <div>
        filter shown with: <input onChange={handleFilterName}></input>
      </div>
    </form>
  );
};

export default Filter;
