import React, { createContext, useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../utils/constants";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState();

    return (
        <AuthContext.Provider value={{ jwt, setJwt }}>
            {children}
        </AuthContext.Provider>
    )
}