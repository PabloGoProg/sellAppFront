
import { Empleado } from "../Definitions/Classes/Empleado";
import { Usuario } from "../Definitions/Classes/Usuario";

export const LIMITE_PERDIDA_MATERIAL = 0.3;
export const DIMENSIONES_LAMINA_VIDRIO = {
  ANCHO: 2.20,
  ALTO: 1.50
}

export const EmpleadoProvicional = new Empleado({
  infoPersonal: {
    nombre: 'Juan Perez',
  },
  correoPrincipal: 'juanperez@gmail.com',
  telefonoPrincipal: '1234567890',
  contrasena: '123456'
});

export const ClienteProvicional = new Usuario({
  nombre: 'Mariana Hernandez',
})

export const PRODUCTOS_MANEJADOS = ['Ventana', 'Puerta', 'Barandal'];

export const REFRENCIAS_PROVICIONALES = {
  VENTANA: ['7:44', '50:20', '80:25', 'Perfileria Baño'],
  PUERTA: ['5:25', '100;20'],
  BARANDAL: ['12:10', '8:25']
}

export const referenciasVidrio = [
  { nombre: 'Claro', precio: 34000 },
  { nombre: 'Bronce 4mm', precio: 39000 },
  { nombre: 'Reflectivo', precio: 39000 },
  { nombre: 'Miniboreal', precio: 40000 },
  { nombre: 'Arobesco', precio: 55000 },
  { nombre: 'Vidrio Opalizado', precio: 65000 },
  { nombre: 'Claro 6mm', precio: 60000 },
  { nombre: 'Claro 5mm', precio: 55000 },
]

export const componenteRodachinas = [
  { nombre: 'Rusa', precio: 1800 },
  { nombre: '7:44', precio: 6000 },
  { nombre: '50:20', precio: 2500 },
  { nombre: '80:25', precio: 18000 },
]

export const componenteCierre = [
  { nombre: 'Media luna', precio: 7000 },
  { nombre: 'Chapa de impacto', precio: 15000 },
  { nombre: 'Chapa Mariposa', precio: 45000 },
]

// colores https://coolors.co/2f6690-3a7ca5-d9dcd6-16425b-81c3d7