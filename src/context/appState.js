import React, { useState } from 'react'
import config from '../config/config';
import { AUTH_TOKEN, GET_METHOD, POST_METHOD } from '../constants/constants';
import AppContext from './appContext';

function AppState (props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);

    const authenticate = () => {
        if (AUTH_TOKEN !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }

    const getUserByToken = async () => {
        const reqParams = GET_METHOD();
        try {
            const response = await fetch(`${config.backendEndPoint}/user`, reqParams);

            const data = await response.json();
            const { id, name, email } = data.data
            return { id, name, email };

        } catch (error) {
            console.log(error.message)

        }

    }

    const getProducts = async () => {
        try {
            const response = await fetch(`${config.backendEndPoint}/product/products`);

            const data = await response.json();
            setProducts(data.data);
            setError("");
            return data.data;
        } catch (error) {
            setError(error.message);
        }
    }

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
            const response = await fetch(`${config.backendEndPoint}/cart/cartitems/${id}`);
            const data = await response.json();
            console.log(data)
            setCartItemsCount(data.data.length);
            setCartItems(data.data)
            let price = 0;
            for (let i = 0; i < data.data.length; i++) {
                price = price + data.data[i].product.price * data.data[i].quantity
                console.log(price)
            }
            setCartPrice(price)
        } catch (error) {
            return error.message
        }
    }

    const addToCart = async (userId, productId, category) => {
        const reqParams = POST_METHOD({ userId, productId, category });

        const response = await fetch(`${config.backendEndPoint}/cart/cartorlist`, reqParams)

        const data = await response.json();

        console.log(data);

    }

    return (
        <AppContext.Provider
            value={{
                getUserByToken,
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
                cartPrice
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;