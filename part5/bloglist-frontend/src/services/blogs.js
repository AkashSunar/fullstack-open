import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const setToken = (newToken) => {
    token=`Bearer ${newToken}`
    
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newObject) => {
  const config = {
    headers:{Authorization:token}
  }
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response, "from createblog services");
  return response;
}

export default { getAll,setToken,createBlog }