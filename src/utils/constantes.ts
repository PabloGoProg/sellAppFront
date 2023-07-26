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

// colores https://coolors.co/2f6690-3a7ca5-d9dcd6-16425b-81c3d7