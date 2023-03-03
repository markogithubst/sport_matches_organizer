import { createContext, useReducer } from 'react';


export const AuthContext = createContext()

export const authReducer = (state, action) => {

    if (action.type === "LOGIN") {
        return {
            ...state,
            role: action.payload.role,
            token:  action.payload.token,
            
        }
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, null)

    console.log("AuthContext state", state)
    return (
        <AuthContext.Provider value={{...state, dispatch} }>
            {children}
        </AuthContext.Provider>
    )
}