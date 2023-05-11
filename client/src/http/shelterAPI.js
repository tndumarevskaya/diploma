import { $authHost, $host} from ".";
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password});
    localStorage.setItem('jsonWebToken', data.jsonWebToken);
    return jwt_decode(data.jsonWebToken);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('jsonWebToken', data.jsonWebToken);
    return jwt_decode(data.jsonWebToken);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/authorization');
    localStorage.setItem('jsonWebToken', data.jsonWebToken);
    console.log(jwt_decode(data.jsonWebToken));
    return jwt_decode(data.jsonWebToken);
}