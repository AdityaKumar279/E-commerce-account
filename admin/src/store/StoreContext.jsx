import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const backendUri = import.meta.env.VITE_APP_API_URL
     const navigate = useNavigate()

     const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")
 
 
 
     useEffect(() => {
   
    localStorage.setItem('token', token)
    
  }, [token])



    const value = {
        token,
        setToken,
        backendUri,
        navigate

    }


     return (
        <StoreContext.Provider value={value}>
          {props.children}
        </StoreContext.Provider>
      );

}

export default StoreContextProvider