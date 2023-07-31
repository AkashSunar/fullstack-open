import axios from "axios";
let baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  return axios.get(baseUrl);
};
const create = (personObj) => {
  return axios.post(baseUrl, personObj);
};
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
const updateNumber = (id) => {
    return axios.put(`${baseUrl}/${id}`)
    
}
export default { getAll, create, deletePerson,updateNumber };
