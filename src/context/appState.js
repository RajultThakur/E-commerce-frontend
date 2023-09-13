import React,{useState} from 'react'
import AppContext from './appContext';

function AppState (props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const authenticate = () => {
        if(localStorage.getItem("auth-token") !== null){
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
    }

    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/product/products");

            const data = await response.json();
            setProducts(data);
            setError("");
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
                error,
                setError
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;