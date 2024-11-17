import React, { useEffect, useState } from 'react'
import { createCategory, removeCategory } from '../../api/category'
import useEcomStore from '../../store/ecom-store';
import { toast } from 'react-toastify'

const FormCategory = () => {
  const [name, setName] = useState(null);
  const token = useEcomStore((state)=>state.token)
  const getCategory = useEcomStore((state)=>state.getCategory)
  // const [categories, setCategories] = useState([])
  const categories = useEcomStore((state)=>state.categories)
  useEffect(()=>{
    getCategory(token)
  },[])
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!name) {
      return toast.warning('Please fill data')
    }
    try {
      const res = await createCategory({name},token)
      toast.success(`Add Category ${res.data.name} Success!!!`)
      getCategory(token)
    } catch (err) {
      console.log(err)
    }
  }
  const handleRemoveCategory = async(id) =>{
    console.log(id)
    try {
      const res = await removeCategory(token,id)
      console.log(res)
      toast.success(`Delete ${res.data.name} success`)
      getCategory(token)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
      <h1>Category Management</h1>
      <form className='my-4' onSubmit={handleSubmit}>
        <input
        onChange={(e)=>setName(e.target.value)}
        className='border'
        type="text" />
        <button className='bg-blue-500 rounded-md py-1 px-1 text-white'>Add Category</button>
      </form>
      <hr />
      <ul className='list-none'>
        {
          categories.map((item, index)=>
          <li className='flex justify-between my-2' key={index}>
            <span>
              {item.name}
            </span>
            <button className='bg-red-500 rounded-md py-1 px-1 text-white' onClick={()=>handleRemoveCategory(item.id)}>Delete</button>
          </li>
          )
        }
      </ul>
    </div>
  )
}

export default FormCategory