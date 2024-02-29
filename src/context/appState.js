import React, { useState } from 'react'
import config from '../config/config';
import { ADDED_TO_CART, ADDED_TO_CART_AND_WISHLIST, AUTH_TOKEN, GET_METHOD, POST_METHOD } from '../constants/constants';
import AppContext from './appContext';

function AppState (props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);
    const [loggedUser, setLoggedUser] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    })
    const [allOrders, setAllOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    const authenticate = () => {
        if (AUTH_TOKEN !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }

    const getUserByToken = async () => {
        if (AUTH_TOKEN === null) {
            setLoggedUser({
                id: '',
                name: "",
                email: '',
                role: ""
            })
            return {
                id: '',
                name: "",
                email: '',
                role: ""
            }
        }
        const reqParams = GET_METHOD();
        try {
            const response = await fetch(`${config.backendEndPoint}/user`, reqParams);

            const data = await response.json();
            const { id, name, email, role } = data.data
            setLoggedUser({ id, name, email, role })
            return { id, name, email, role };

        } catch (error) {
            console.log(error.message)
        }

    }

    const getProducts = async (price="") => {
        try {
            let url = `${config.backendEndPoint}/product/products`
            if(price !== ""){
                url = `${config.backendEndPoint}/product/products?price`
            }
            const response = await fetch(url);

            const data = await response.json();
            setProducts(data.data);
            setError("");
            return data.data;
        } catch (error) {
            setError(error.message);
        }
    }

    useState(async() => {
        await getProducts();
    },[products]);

    const getProductById = async (id, formattedData = false) => {
        try {
            const response = await fetch(`${config.backendEndPoint}/product/${id}`
            );
            const data = await response.json();
            setError("");
            const product = data.product;
            if (formattedData) {
                const { _id, brand, title, description, img, category, price, stock } = product;
                return {
                    id: _id,
                    brand,
                    title,
                    description,
                    img,
                    category,
                    price,
                    stock
                }
            }
            return product;
        } catch (error) {
            setError(error.message);
        }
    }

    const getCartItems = async (id) => {
        try {
            const response = await fetch(`${config.backendEndPoint}/cart/cart-items/${id}`);
            const data = await response.json();
            const onlyCartItems = data.data.filter((ele) => {
                return (ele.category === ADDED_TO_CART || ele.category === ADDED_TO_CART_AND_WISHLIST);
            })
            setCartItemsCount(onlyCartItems.length);
            setCartItems(onlyCartItems)
            let price = 0;
            for (let i = 0; i < onlyCartItems.length; i++) {
                price = price + onlyCartItems[i].product.price * onlyCartItems[i].quantity
            }
            setCartPrice(price)
        } catch (error) {
            return error.message
        }
    }

    const addToCart = async (authorId, productId, category) => {
        const reqParams = POST_METHOD({ authorId, productId, category });
        const response = await fetch(`${config.backendEndPoint}/cart/cartorlist`, reqParams)

        const data = await response.json();
        return data;

    }

    const removeFromCart = async (id) => {
        const response = await fetch(`${config.backendEndPoint}/cart/remove/${id}`)

        const data = await response.json();
        return data;

    }

    const removeAllFromCart = async () => {
        for (let i = 0; i < cartItems.length; i++) {
            await removeFromCart(cartItems[i]._id);
        }
        await getCartItems(loggedUser.id);
    }

    const getAllOrders = async (id) => {
        const response = await fetch(`${config.backendEndPoint}/order/orders/${id}`)
        const data = await response.json();
        setAllOrders(data.data);

    }

    return (
        <AppContext.Provider
            value={{
                getUserByToken,
                loggedUser,
                setLoggedUser,
                isAuthenticated,
                authenticate,
                getProducts,
                products,
                error,
                setError,
                getProductById,
                getCartItems,
                addToCart,
                cartItems,
                cartItemsCount,
                cartPrice,
                setCartItems,
                setCartItemsCount,
                setCartPrice,
                removeFromCart,
                getAllOrders,
                allOrders,
                setOrderDetails,
                removeAllFromCart
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;