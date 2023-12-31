import personServices from "../services/phonebook";
const PersonForm = ({
  handleChange,
  handleNum,
  newName,
  newNumber,
  handleSubmit,
}) => {
  const handleUpdate = () => {
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type="text" value={newName} onChange={handleChange} />
      </div>
      <div>
        number: <input type="text" value={newNumber} onChange={handleNum} />
      </div>
      <div>
        <button type="submit" onClick={()=>handleUpdate()}>add</button>
      </div>
    </form>
  );
};
export default PersonForm;
