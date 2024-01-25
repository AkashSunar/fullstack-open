import axios from "axios";
const baseUrl = "/api/login";
let token = null;

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response;
}

// const setToken = (newToken) => {
//     token=`Bearer ${newToken}`
    
// }
export default { login };