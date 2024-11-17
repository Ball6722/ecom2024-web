import axios from "axios"

export const getOrdersAdmin = async (token) =>{
    return await axios.get('https://ecom2024-api-navy.vercel.app/api/admin/order',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeOrderStatus = async (token,orderId,orderStatus) =>{
    return await axios.put('https://ecom2024-api-navy.vercel.app/api/admin/order-status',{
        orderId,
        orderStatus
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const getListAllUsers = async (token) =>{
    return await axios.get('https://ecom2024-api-navy.vercel.app/api/users',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserStatus = async (token, value) =>{
    return await axios.post('https://ecom2024-api-navy.vercel.app/api/change-status',value,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeUserRole = async (token, value) =>{
    return await axios.post('https://ecom2024-api-navy.vercel.app/api/change-role',value,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}