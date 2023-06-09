import axios from 'axios';

const $host = axios.create({
    baseURL: 'https://animal-shelter.onrender.com'
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('jsonWebToken')}`;
    console.log(config.headers.authorization);
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}