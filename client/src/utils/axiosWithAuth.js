import axios from 'axios';

export default function axiosWithAuth(){
    const token = JSON.parse(localStorage.getItem('token'));

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: 'http://localhost:5000/api'
    })
}