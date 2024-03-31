import axios from "axios";

const protocol = window.location.protocol + "//";
const hostname = window.location.hostname;
const port = window.location.port;

export default axios.create({
  baseURL: protocol + hostname + ":" + port,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
