import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'
const Shop = () => {
  const getProducts = useEcomStore((state)=>state.getProducts)
  const products = useEcomStore((state)=>state.products)
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div className='flex'>
      {/* SearchBar */}
        <div className='bg-gray-100 p-4 w-1/4 h-screen overflow-y-auto'>
          <SearchCard />
        </div>
      {/* Product */}
        <div className='w-1/2 p-4 h-screen overflow-y-auto'>
          <p className='text-2xl font-bold mb-4'>สินค้าทั้งหมด</p>
          <div className='flex flex-wrap gap-4'>
            {/* product card */}
            {
              products.map((item, index)=> <ProductCard key={index} item={item} />)
            }
            {/* product card */}
          </div>
        </div>
      {/* Cart */}
        <div className='bg-gray-100 p-4 w-1/4 h-screen overflow-y-auto'>
          <CartCard />
        </div>
    </div>
  )
}

export default Shop