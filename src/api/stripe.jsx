import axios from "axios";

export const payment = async(token) =>
    await axios.post("https://ecom2024-api-navy.vercel.app/api/user/create-payment-intent", {}, {
    headers:{
        Authorization: `Bearer ${token}`
    }
});

