import axios from 'axios'

const baseURL = 'https://ecommerce-store-backend.vercel.app/api'

export const adminRequest = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})
