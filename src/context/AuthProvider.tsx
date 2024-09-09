import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {
    const [signed, setSigned] = useState(false)
    
    return (
        <AuthContext.Provider value={{signed, setSigned}}>
            {children}
        </AuthContext.Provider>
    )
}