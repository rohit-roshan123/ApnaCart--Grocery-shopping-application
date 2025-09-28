import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './Pages/AllProducts';
import ProductCategory from './Pages/ProductCategory';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import AddAddress from './Pages/AddAddress';
import MyOrders from './Pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './Pages/seller/SellerLayout';

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");

  const {showUserLogin, isSeller} = useAppContext()


  return (
    <div>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}

      <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}  />
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}/>
          
        </Routes>
      </div>

      {!isSellerPath && <Footer/>}
      
    </div>
  )
}

export default App
