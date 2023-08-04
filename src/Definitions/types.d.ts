/**
 * @file Archivo de definiciones de tipos
 */

import type { Cliente } from './Classes/Cliente'
import type { Empleado } from './Classes/Empleado'
import type { Producto } from './Interfaces/Producto'

/**
 * Representa las propiedades del producto base de la aplicación
 */
export type Medidas ={
  ancho: number
  alto: number
}

/**
 * Representa las propiedades de un producto de tipo ventana dentro de la aplicación
 */
export type PropiedadesVentana = {
  exterior: boolean
  numeroCuerpos: number
}

/**
 * Representa las partes que lleva una venatana que puede diseñada para interiores y exteriores
 * 1. SI la ventana esta en exteriores, lleva sillar alfajia
 * 2. Si la ventana esta en interiores, lleva sillar 
 * 3. Si la ventana requiere de abrirse en dos cuerpos, necesita de enganche
 */
export type PartesVentana = {
  cabezal: number
  sillar?: number
  sillarAlfajia?: number
  jamba: number
  traslape: number
  enganche?: number
  horizontalSuperior: number
  horizontalInferior: number
}

// --------------------------------------------------------------------------------------------------------

export type informacionPersonal = {
  nombre: string
  correo?: string
  telefono?: string
  telefonoSecundario?: string
}

export type InformacionEmpleado = {
  infoPersonal: informacionPersonal
  correoPrincipal: string
  telefonoPrincipal: string
  contrasena: string
}

export type infoCotizacion = {
  nombreCliente: string
  fecha: Date
  numeroProductos: number
  total: number
}