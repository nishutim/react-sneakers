import axios from "axios";

const $axios = axios.create({
   baseURL: "https://63f4a7c82213ed989c478c97.mockapi.io/api"
});

const $axiosCart = axios.create({
   baseURL: "https://63f5c6c99daf59d1ad7b2cf6.mockapi.io/api"
});

export {
   $axios,
   $axiosCart
};
