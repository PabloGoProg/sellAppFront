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
  super: Medidas
  exterior: boolean
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
  horizontales: {
    superior: number
    inferior: number
  }
}

// --------------------------------------------------------------------------------------------------------

export type informacionPersonal = {
  nombre: string
  apellido: string
  correos?: string[]
  telefonos?: string[]
}

export type InformacionEmpleado = {
  infoPersonal: informacionPersonal
  correoPrincipal: string
  telefonoPrincipal: string
  contrasena: string
}