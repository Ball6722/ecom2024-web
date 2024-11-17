// rafce
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  // code javascript
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  )
}

export default App