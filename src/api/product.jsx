import axios from "axios";

export const createProduct = async (form, token) =>{
    return await axios.post('https://ecom2024-api-navy.vercel.app/api/product',form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const listProduct = async (count = 20) =>{
    return await axios.get('https://ecom2024-api-navy.vercel.app/api/products/' + count)
}
export const readProduct = async (token, id) =>{
    return await axios.get('https://ecom2024-api-navy.vercel.app/api/product/' + id,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const deleteProduct = async (token, id) =>{
    return await axios.delete('https://ecom2024-api-navy.vercel.app/api/product/' + id,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) =>{
    return await axios.put('https://ecom2024-api-navy.vercel.app/api/product/' + id, form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (form, token) =>{
    return await axios.post('https://ecom2024-api-navy.vercel.app/api/images',{
        image: form
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const removeFiles = async (public_id, token) =>{
    return await axios.post('https://ecom2024-api-navy.vercel.app/api//removeimages',{
        public_id
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) =>{
    return await axios.post('https://ecom2024-api-navy.vercel.app/api/search/filters',arg)
}

export const listProductBy = async(sort, order, limit) =>
    await axios.post("https://ecom2024-api-navy.vercel.app/api/productby", {
        sort,
        order,
        limit
    }
);