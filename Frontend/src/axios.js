import axios from "axios";

const instance = axios.create({
  baseURL: "https://examly-mern.herokuapp.com/api/v1",
  withCredentials: true,
});

export default instance;
