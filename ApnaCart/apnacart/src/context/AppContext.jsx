import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setshowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({})
    
    // Fetch All Products
    const fetchProducts = async ()=>{
        setProducts(dummyProducts)
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    // Add Product to Cart

    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }
        else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    // Update Cart Item Quantity

    const updateCartItem = (itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("cart Updated")

    }

    // Remove Product from Cart

    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId]
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }

    

    const value = {user, setUser, isSeller, setIsSeller, navigate, showUserLogin, setshowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, fetchProducts}


    return <AppContext.Provider value={value}>

        {children}


    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}