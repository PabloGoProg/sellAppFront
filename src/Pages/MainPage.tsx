import { Aluminio } from '../Definitions/Classes/Aluminio';
import { CarritoCompras } from '../Definitions/Classes/CarritoCompras'
import { Empleado } from '../Definitions/Classes/Empleado'
import { Ventana } from '../Definitions/Classes/Ventana';
import { Vidrio } from '../Definitions/Classes/Vidrio';

export function MainPage(): JSX.Element {
  
  const empleado1 = new Empleado({
    infoPersonal: {
      nombre: 'Juan',
      apellido: 'Perez'
    },
    correoPrincipal: 'juanperez@gmail.com',
    telefonoPrincipal: '1234567890',
    contrasena: '123456'
  });

  const al1 = new Aluminio(10)
  al1.refertenciaSeleccionada = 'a1'
  const al2 = new Aluminio(20)
  al2.refertenciaSeleccionada = 'a2'
  const v1 = new Vidrio(10)
  v1.refertenciaSeleccionada = 'v1'

  const miVenta = new Ventana({
    super: {
      alto: 2,
      ancho: 1.90
    },
    exterior: true,
    numeroCuerpos: 3
  })

  miVenta.aluminio = al2
  miVenta.vidrio = v1

  const miVenta2 = new Ventana({
    super: {
      alto: 1.50,
      ancho: 1.20
    },
    exterior: false,
    numeroCuerpos: 2
  })

  miVenta2.aluminio = al2
  miVenta2.vidrio = v1

  const miVenta3 = new Ventana({
    super: {
      alto: 1.40,
      ancho: 1.80
    },
    exterior: true,
    numeroCuerpos: 2
  })

  miVenta3.aluminio = al2
  miVenta3.vidrio = v1

  const miCarrito = new CarritoCompras(empleado1);
  miCarrito.agregarProducto(miVenta);
  miCarrito.agregarProducto(miVenta2);
  miCarrito.agregarProducto(miVenta3);
  miCarrito.calcularMateriales();

  return (
    <div className='text-blue-700'>
      <h1>MainPage</h1>
      {miCarrito.listaProductos.map((producto, index) => {
        return (
          <div key={index}>
            <h2>Producto {index + 1}</h2>
            <p>Alto: {producto.medidas.alto}</p>
            <p>Ancho: {producto.medidas.ancho}</p>
            <p>Aluminio: {producto.aluminio?.refertenciaSeleccionada}</p>
          </div>
        );
      })}
    </div>
  );
}