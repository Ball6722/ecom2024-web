import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
const LoadingToRedirect = () => {
  const [count, setCount] = useState(10)
  const [redirect, setRedirect] = useState(false)

  useEffect(()=>{
    const interval = setInterval(()=>{
        setCount((currentCount)=>{
            if (currentCount === 1) {
                clearInterval(interval)
                setRedirect(true)
            }

            return currentCount - 1
        })
    }, 1000)
    return () => clearInterval(interval)
  },[])

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div>No Permission Redirect In {count}</div>
  )
}

export default LoadingToRedirect