/**
 * Movie Book - Application - http-service.js
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import axios from "axios";
import { toast } from "react-toastify";
import logger from "./../log-service";

// catch unexpected errors
axios.interceptors.response.use(null, (error) => {
  const expectedException =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedException) {
    logger.log(error);
    toast("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
