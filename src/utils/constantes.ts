import { Cliente } from "../Definitions/Classes/Cliente";
import { Empleado } from "../Definitions/Classes/Empleado";

export const LIMITE_PERDIDA_MATERIAL = 0.3;
export const DIMENSIONES_LAMINA_VIDRIO = {
  ANCHO: 2.20,
  ALTO: 1.50
}

export const EmpleadoProvicional = new Empleado({
  infoPersonal: {
    nombre: 'Juan',
    apellido: 'Perez'
  },
  correoPrincipal: 'juanperez@gmail.com',
  telefonoPrincipal: '1234567890',
  contrasena: '123456'
});

export const ClienteProvicional = new Cliente({
  nombre: 'Mariana',
  apellido: 'Hernandez',
})

export const PRODUCTOS_MANEJADOS = ['Ventana', 'Puerta', 'Barandal'];

export const REFRENCIAS_PROVICIONALES = {
  VENTANA: ['7:44', '80:25'],
  PUERTA: ['5:25', '100;20'],
  BARANDAL: ['12:10', '8:25']
}

// colores https://coolors.co/2f6690-3a7ca5-d9dcd6-16425b-81c3d7