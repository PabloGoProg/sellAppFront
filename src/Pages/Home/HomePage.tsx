import { SearchBar } from '../../Components/SearchBar';
import AddIcon from '@mui/icons-material/Add'
import { Aluminio } from '../../Definitions/Classes/Aluminio';
import { CarritoCompras } from '../../Definitions/Classes/CarritoCompras'
import { Empleado } from '../../Definitions/Classes/Empleado'
import { Ventana } from '../../Definitions/Classes/Ventana/Ventana';
import { Vidrio } from '../../Definitions/Classes/Vidrio';
import { Cotizacion } from './Cotizacion';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../../Definitions/Classes/Usuario';

export default function HomePage(): JSX.Element {

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/add');
  }
  
  const empleado1 = new Empleado({
    infoPersonal: {
      nombre: 'Juan Perez',
    },
    correoPrincipal: 'juanperez@gmail.com',
    telefonoPrincipal: '1234567890',
    contrasena: '123456'
  });

  const cliente1 = new Usuario({
    nombre: 'Mariana hernandez',
  })

  const al1 = new Aluminio(10)
  al1.refertenciaSeleccionada = 'a1'
  const al2 = new Aluminio(20)
  al2.refertenciaSeleccionada = 'a2'
  const v1 = new Vidrio(10)
  v1.refertenciaSeleccionada = 'v1'

  const miVenta = new Ventana({alto: 100, ancho: 100}, 'v1');

  miVenta.aluminio = al2
  miVenta.vidrio = v1

  const miVenta2 = new Ventana({alto: 100, ancho: 100}, 'v1')

  miVenta2.aluminio = al2
  miVenta2.vidrio = v1

  const miVenta3 = new Ventana({alto: 100, ancho: 100}, 'v1')

  miVenta3.aluminio = al2
  miVenta3.vidrio = v1

  const miCarrito = new CarritoCompras(empleado1, cliente1);
  miCarrito.agregarProducto(miVenta);
  miCarrito.agregarProducto(miVenta2);
  miCarrito.agregarProducto(miVenta3);
  miCarrito.calcularMateriales();

  const infCot = {
    nombreCliente: miCarrito.datosComprador.informacionPersonal.nombre,
    fecha: new Date(),
    numeroProductos: miCarrito.listaProductos.length,
    total: 1200000
  }

  return (
    <section className='bg-white' >

      <section className='flex justify-center gap-2 my-2'>
        <SearchBar />  
        <button onClick={handleAdd} className='fixed bottom-5 z-20 right-5 w-fit bg-blue-500 px-1.5 py-1.5 text-white font-extrabold text-lg rounded-full hover:bg-blue-800 shadow-xl transition-all'>
          <AddIcon fontSize='large'/>
        </button>    
      </section>

      <Cotizacion 
      fecha={infCot.fecha}
      nombreCliente={infCot.nombreCliente}
      numeroProductos={infCot.numeroProductos}
      total={infCot.total} />
      <Cotizacion 
      fecha={infCot.fecha}
      nombreCliente={infCot.nombreCliente}
      numeroProductos={infCot.numeroProductos}
      total={infCot.total} />
      <Cotizacion 
      fecha={infCot.fecha}
      nombreCliente={infCot.nombreCliente}
      numeroProductos={infCot.numeroProductos}
      total={infCot.total} />
    </section>
  );
}