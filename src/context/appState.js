import React,{useState} from 'react'
import AppContext from './appContext';

function AppState (props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const authenticate = () => {
        if(localStorage.getItem("auth-token") !== null){
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
    }



    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                authenticate
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;