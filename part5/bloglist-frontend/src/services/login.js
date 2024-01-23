import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    // console.log(response.data,"from login services")
    return response.data;
}
export default { login };