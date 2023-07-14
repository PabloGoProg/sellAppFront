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
      alto: 2,
      ancho: 1.90
    },
    exterior: true,
    numeroCuerpos: 3
  })

  miVenta.aluminio = al2

  const miVenta2 = new Ventana({
    super: {
      alto: 1.50,
      ancho: 1.20
    },
    exterior: false,
    numeroCuerpos: 2
  })

  miVenta2.aluminio = al2

  const miVenta3 = new Ventana({
    super: {
      alto: 1.40,
      ancho: 1.80
    },
    exterior: true,
    numeroCuerpos: 2
  })

  miVenta3.aluminio = al2

  const miCarrito = new CarritoCompras(empleado1);
  miCarrito.agregarProducto(miVenta);
  miCarrito.agregarProducto(miVenta2);
  miCarrito.agregarProducto(miVenta3);

  miCarrito.calcularAluminioProductos();

  console.log(miCarrito)

  return (
    <h1> Hello </h1>
  )
}

export default App
