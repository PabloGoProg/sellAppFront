import React, { createContext, useState, useContext } from "react";
import { CarritoCompras } from "../Definitions/Classes/CarritoCompras";
import { ClienteProvicional, EmpleadoProvicional } from "../utils/constantes";

// Definir el tipo para el valor del contexto
interface CarritosContextValue {
  carrito: CarritoCompras;
  setCarrito: (carrito: CarritoCompras) => void;
}

// Crear el contexto con el tipo adecuado
const CarritosContext = createContext<CarritosContextValue | null>(null);

// Definir el componente que envuelve la aplicación para proporcionar el contexto
export function CarritoProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [carrito, setCarrito] = useState(new CarritoCompras(EmpleadoProvicional, ClienteProvicional));

  const contextValue: CarritosContextValue = {
    carrito,
    setCarrito,
  };

  return <CarritosContext.Provider value={contextValue}>{children}</CarritosContext.Provider>;
}

// Hook personalizado para acceder al contexto
export function useCarrito(): CarritosContextValue {
  const context = useContext(CarritosContext);
  if (!context) {
    throw new Error("useCarritosContext debe ser utilizado dentro del proveedor CarritoProvider");
  }
  return context;
}
