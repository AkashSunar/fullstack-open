import axios from "axios";
let baseUrl = "/api/persons";
const getAll = () => {
  return axios.get(baseUrl);
};
const create = (personObj) => {
  return axios.post(baseUrl, personObj);
};
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
const updateNumber = (id, obj) => {
 return axios.put(`${baseUrl}/${id}`,obj)
    }
export default { getAll, create, deletePerson,updateNumber };
