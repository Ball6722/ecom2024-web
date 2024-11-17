import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from '../../utils/number';
const SearchCard = () => {
  const [text, setText] = useState('')
  const [price, setPrice] = useState([1000, 3000])
  const [ok, setOK] = useState(false)
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const getProducts = useEcomStore((state)=>state.getProducts)
  const products = useEcomStore((state)=>state.products)
  // 1 การค้นหาโดยข้อความ
  const actionSearchFilters = useEcomStore((state)=>state.actionSearchFilters)
  const getCategory = useEcomStore((state)=>state.getCategory)
  const categories = useEcomStore((state)=>state.categories)
  useEffect(()=>{
    getCategory()
  },[])
  useEffect(()=>{
    const delay = setTimeout(()=>{
        if(text){
          actionSearchFilters({ query: text })
        }else{
          getProducts()
        }
    }, 300)
    return  () => clearTimeout(delay)
  },[text])
  // const handleChangeText = (e) => {
  //   setText(e.target.value)
  //   if (e.target.value !== '') {
  //     actionSearchFilters({ query: text })
  //   }else{
  //     getProducts()
  //   }
  // }
  // 2 การค้นหาโดยหมวดหมู่
  const handleCheck = (e) => {
    console.log(e.target.value)
    const inCheck = e.target.value; //ค่าที่เราติ๊ก
    const inState = [...categoriesSelected] // []
    const findCheck  = inState.indexOf(inCheck) // ถ้าไม่เจอจะรีเทิร์น -1
    if (findCheck === -1) {
      inState.push(inCheck)
    }else{
      inState.splice(findCheck,1)
    }
    setCategoriesSelected(inState)
    if (inState.length > 0) {
      actionSearchFilters({ category: inState })
    }else{
      getProducts()
    }
  }
  // 3 การค้นหาโดยราคา
  useEffect(()=>{
    actionSearchFilters({ price })
  },[ok])
  const handlePrice = (value) => {
    setPrice(value)
    setTimeout(()=>{
      setOK(!ok)
    },300)
  }

  return (
    <div>
        <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>

        <input
        onChange={(e)=>setText(e.target.value)}
        placeholder='ค้นหาสินค้า'
        className='border rounded-md w-full mb-4 px-2' 
        type='text' 
        />

        {/* ค้นหาโดยหมวดหมู่สินค้า */}
        <div>
          <h1 className='text-xl font-bold mb-4'>หมวดหมู่สินค้า</h1>
          <div>
            {
              categories.map((item,index)=>
                <div className='flex gap-2' key={index}>
                     <input onChange={handleCheck} type="checkbox" value={item.id} />
                     <label>{item.name}</label>
                </div>
              )
            }
          </div>
        </div>
        <hr />
        {/* ค้นหาโดยราคา */}
        <div>
          <h1 className='text-xl font-bold'>ค้นหาราคา</h1>
          <div>
            <div className='flex justify-between'>
              <span>Min: {numberFormat(price[0])}</span>
              <span>Max: {numberFormat(price[1])}</span>
            </div>
            <Slider 
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000,30000]}
            />
          </div>
        </div>
    </div>
  )
}

export default SearchCard