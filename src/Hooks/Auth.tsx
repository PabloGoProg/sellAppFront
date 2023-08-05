import React from "react";
import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface AuthContextValue {
  user: {correo: string, contrasena: string} | null;
  login: (usuario: {correo: string, contrasena: string}) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (usuario: {correo: string, contrasena: string}) => {
    };

    const logout = () => {
        setUser(null);
        navigate("/login");
    }

    const auth = {user, login, logout};

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export function PrrotectedRoute({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    if(!auth?.user) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

export { AuthProvider, useAuth };