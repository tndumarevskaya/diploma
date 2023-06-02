import {$host} from ".";
import jwt_decode from 'jwt-decode';

const registerShelter = async (email, password, name) => {
    try {
        const {data} = await $host.post('/shelter/registration', {email, password, name});
        const decoded_data = jwt_decode(data);
        localStorage.setItem('user', JSON.stringify(decoded_data));
        localStorage.setItem('token', data);
        console.log("api");
        return decoded_data;
    } catch (error) {
        console.log(error.response);
        throw JSON.stringify(error.response);
    }
}

const registerVolunteer = async (email, password, firstName, lastName) => {
    try {
        const {data} = await $host.post('/volunteer/registration', {email, password, firstName, lastName});
        const decoded_data = jwt_decode(data);
        localStorage.setItem('user', JSON.stringify(decoded_data));
        localStorage.setItem('token', data);
        console.log(decoded_data);
        return decoded_data;
    } catch (error) {
        console.log(error.response);
        throw JSON.stringify(error.response);
    }
}

const registerAdopter = async (email, password, firstName, lastName) => {
    try {
        const {data} = await $host.post('/adopter/registration', {email, password, firstName, lastName});
        const decoded_data = jwt_decode(data);
        localStorage.setItem('user', JSON.stringify(decoded_data));
        localStorage.setItem('token', data);
        console.log(decoded_data);
        return decoded_data;
    } catch (error) {
        console.log(error.response);
        throw JSON.stringify(error.response);
    }
}

const loginShelter = async (email, password) => {
    try {
        const {data} = await $host.post('/shelter/login', {email, password});
        const decoded_data = jwt_decode(data);
        localStorage.setItem('user', JSON.stringify(decoded_data));
        localStorage.setItem('token', data);
        console.log(decoded_data);
        return decoded_data;
    } catch (error) {
        console.log(error.response);
        throw JSON.stringify(error.response);
    }
}

const loginVolunteer = async (email, password) => {
    try {
        const {data} = await $host.post('/volunteer/login', {email, password});
        const decoded_data = jwt_decode(data);
        localStorage.setItem('user', JSON.stringify(decoded_data));
        localStorage.setItem('token', data);
        console.log(decoded_data);
        return decoded_data;
    } catch (error) {
        console.log(error.response);
        throw JSON.stringify(error.response);
    }
}

const loginAdopter = async (email, password) => {
    try {
        const {data} = await $host.post('/adopter/logon', {email, password});
        const decoded_data = jwt_decode(data);
        localStorage.setItem('user', JSON.stringify(decoded_data));
        localStorage.setItem('token', data);
        console.log(decoded_data);
        return decoded_data;
    } catch (error) {
        console.log(error.response);
        throw JSON.stringify(error.response);
    }
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem('token');
};

export default {
    registerShelter,
    loginShelter,
    registerVolunteer,
    loginVolunteer,
    registerAdopter,
    loginAdopter,
    logout,
};