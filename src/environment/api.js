import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/',  // Ensure the base URL is correct
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
