import axios from "axios";
const JwtMiddleware = axios.create({
  baseURL: `${process.env.REACT_APP_SWIGGATOBASEURL}`,
  timeout: 6 * 60 * 1000, //6mins
});

const requestHandler = (request) => {
  request.meta = request.meta || {};
  request.meta.requestStartedAt = new Date().getTime();
  if (window.location.pathname !== "login") {
    request.headers.Authorization = `Bearer`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/login";
  }
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

JwtMiddleware.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
JwtMiddleware.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default JwtMiddleware;
