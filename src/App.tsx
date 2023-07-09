import './App.css'
import { Aluminio } from './Definitions/Classes/Aluminio';
import { CarritoCompras } from './Definitions/Classes/CarritoCompras'
import { Empleado } from './Definitions/Classes/Empleado'
import { Ventana } from './Definitions/Classes/Ventana';

function App (): JSX.Element {

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

  const miVenta = new Ventana({
    super: {
      alto: 1.90,
      ancho: 2
    },
    exterior: false
  })

  miVenta.aluminio = al1

  const miVenta2 = new Ventana({
    super: {
      alto: 1.20,
      ancho: 1.40
    },
    exterior: false
  })

  miVenta2.aluminio = al2

  const miVenta3 = new Ventana({
    super: {
      alto: 1.80,
      ancho: 1.40
    },
    exterior: false
  })

  miVenta3.aluminio = al2

  const miCarrito = new CarritoCompras(empleado1);
  miCarrito.agregarProducto(miVenta);
  miCarrito.agregarProducto(miVenta2);
  miCarrito.agregarProducto(miVenta3);

  miCarrito.calcularAluminioProductos();

  return (
    <h1> Hello </h1>
  )
}

export default App
