import axios from "axios";

let $API;

if (process.env.REACT_APP_SERVER_API_LOCAL) {
  const windowsHost = window.location.protocol + "//" + window.location.host + ":" + (process?.env?.REACT_APP_PORT ? process.env.REACT_APP_PORT : "3000");
  $API = axios.create({ baseURL: windowsHost });
} else {
  $API = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });
}

$API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

const responseInterceptor = (config) => {
  console.log(config);
  return config;
};

const responseInterceptorError = (error) => {
  if (401 === error?.response?.status) {
    if (error.response.config.url !== "login") {
      window.location = "/signIn";
    } else {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }
};

$API.interceptors.response.use(responseInterceptor, responseInterceptorError);

export default $API;
