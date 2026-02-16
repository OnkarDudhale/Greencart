import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});


    //fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/check-login');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            console.error('Error fetching seller status:', error);
            setIsSeller(false);
        }
    }

    //fetch user auth status
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/check-login');
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }


    //fetch products from server
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('added to cart');
    }

    //update cart item quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('cart updated');
    }

    //remove item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('item removed from cart');
        setCartItems(cartData);
    }

    //get cart item count
    const getCartCount = () => {
        let count = 0;
        for (const key in cartItems) {
            count += cartItems[key];
        }
        return count;
    }

    //get cart item total price
    const getCartAmount = () => {
        let totalPrice = 0;
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (cartItems[key] > 0) {
                totalPrice += product.offerPrice * cartItems[key];
            }
        }
        return Math.floor(totalPrice * 100) / 100;;
    }


    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();

    }, [])

    //Update Database
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems])

    const value = { setCartItems, axios, navigate, user, setUser, products, isSeller, setIsSeller, showUserLogin, setShowUserLogin, currency, addToCart, updateCartItem, removeFromCart, cartItems, setSearchQuery, searchQuery, getCartAmount, getCartCount, fetchProducts };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}