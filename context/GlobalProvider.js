import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentAccount } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentAccount()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res)
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                setIsLoggedIn,
                user,
                setUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}