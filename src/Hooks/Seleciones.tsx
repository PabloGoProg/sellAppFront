import React, { createContext, useContext } from "react";

// Definir el tipo para el valor del contexto
interface SeleccionesContextValue {
  seleccionesGlobales: Map<string, string>;
  actualizarSeleccion(key: string, seleccion: string): void;
  getSeleccion(key: string): string;
}

// Crear el contexto con el tipo adecuado
const SeleccionContext = createContext<SeleccionesContextValue | null>(null);

// Definir el componente que envuelve la aplicación para proporcionar el contexto
export function SeleccionProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const seleccionesGlobales = new Map<string, string>();

  const actualizarSeleccion = (key: string, seleccion: string): void => {
    seleccionesGlobales.set(key, seleccion);
  }

  const getSeleccion = (key: string): string => {
    return seleccionesGlobales.get(key) || "1";
  }

  const contextValue: SeleccionesContextValue = {
    seleccionesGlobales,
    actualizarSeleccion,
    getSeleccion
  };

  return <SeleccionContext.Provider value={contextValue}>{children}</SeleccionContext.Provider>;
}

// Hook personalizado para acceder al contexto
export function useSelección(): SeleccionesContextValue {
  const context = useContext(SeleccionContext);
  if (!context) {
    throw new Error("useSeleccionContext debe ser utilizado dentro del proveedor CarritoProvider");
  }
  return context;
}
