import React, { useState } from 'react'
import config from '../config/config';
import AppContext from './appContext';

function AppState (props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState("");

    const authenticate = async () => {
        if (localStorage.getItem("auth-token") !== null) {
            await getUserByToken();
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }

    const getUserByToken = async() => {
        try {
            const response = await fetch(`${config.backendEndPoint}/user/token`,{
                method: 'GET',
                headers: {
                  "Content-Type": 'application/json',
                  "auth-token": localStorage.getItem("auth-token")
                  ,
                },
            })

            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.log(error.message)
            
        }

    }

    const getProducts = async () => {
        try {
            const response = await fetch(`${config.backendEndPoint}/product/products`);

            const data = await response.json();
            setProducts(data.products);
            setFilteredProducts(data.products)
            setError("");
            return data.products;
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
                const {_id,brand, title, description, img, category, price, stock} = product;
                return {
                    id : _id,
                    brand,
                    title ,
                    description ,
                    img ,
                    category ,
                    price ,
                    stock
                }
            }
            return product;
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                getProducts,
                products,
                filteredProducts,
                setFilteredProducts,
                error,
                setError,
                getProductById
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;