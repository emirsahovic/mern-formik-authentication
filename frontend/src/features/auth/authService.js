import axios from 'axios';

const API_URL = '/api/users/';

const registerUser = async (userData) => {
    const res = await axios.post(API_URL + 'register', userData);

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
}

const loginUser = async (userData) => {
    const res = await axios.post(API_URL + 'login', userData);

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
}

const authService = {
    registerUser,
    loginUser
}

export default authService;
