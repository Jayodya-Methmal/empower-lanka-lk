import axios from "axios";
import { createContext, useEffect, useState } from "react";

// create a new context for admin authentication
export const AuthAdminContext = createContext();


// create a new context provider component
export const AuthAdminContextProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState(
        /*set up state for the current admin, initialize with the admin
        object in local storage or null if there isn't one */
        JSON.parse(localStorage.getItem("admin")) || null

    );


    /*send a POST request to the server with the admin login credentials
    and the withCredentials option set to true to enable cookies */
    const adminLogin = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/adminLogin", inputs, {
                withCredentials: true,
            });
            setCurrentAdmin(res.data);
        } catch (error) {
            throw new Error(error.response.data);
        }
    };

    /* use the useEffect hook to update local storage whenever the current
     admin state changes */
    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin));
    }, [currentAdmin]);

    return (
        <AuthAdminContext.Provider value={{ currentAdmin, adminLogin }}>
            {children}
        </AuthAdminContext.Provider>
    );
};
