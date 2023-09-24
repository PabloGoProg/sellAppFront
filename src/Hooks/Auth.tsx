import React from "react";
import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { PAGES } from "../utils/const";

interface AuthContextValue {
  user: {correo: string, contrasena: string} | null;
  logged: boolean;
  login: (usuario: {correo: string, contrasena: string}) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState< { correo: string, contrasena: string } | null >(null);
    const [logged, setLogged] = useState<boolean>(false);
    const navigate = useNavigate();

    const saveData = (data: { correo: string, contrasena: string }) => {
        localStorage.setItem('dataSesion', JSON.stringify(data));
    }

    const login = (usuario: {correo: string, contrasena: string}) => {
        setUser(usuario);
        saveData(usuario);
        setLogged(true);
        navigate(PAGES.HOME);
    };

    const logout = () => {
        localStorage.removeItem('dataSesion');
        setUser(null);
        setLogged(false);
        navigate(PAGES.LOGIN);
    }

    const auth: AuthContextValue = {
        user, 
        logged, 
        login, 
        logout
    };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export function PrrotectedRoute({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    if(!auth?.user) {
        return <Navigate to={PAGES.LOGIN} />;
    } else {
        return children;
    }
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("authContext debe ser utilizado dentro del proveedor authProvider");
    }
    return context;
}

export { AuthProvider, useAuth };