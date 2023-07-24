import axios from "axios";

const appAxios = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
});

export default appAxios