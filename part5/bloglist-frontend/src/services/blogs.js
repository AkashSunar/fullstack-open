import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  // console.log(token,"from blog services")
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newObject, token) => {
  console.log(newObject,"kkkk")
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response;
};

const updateLike = async (newObject) => {
  const updateUrl = baseUrl + `/${newObject.id}`;
  const response = await axios.put(updateUrl, newObject);
  return response.data;
};

export default { getAll, setToken, createBlog, updateLike };
