import { SearchBar } from '../../Components/SearchBar';
import AddIcon from '@mui/icons-material/Add'
import { Aluminio } from '../../Definitions/Classes/Aluminio';
import { CarritoCompras } from '../../Definitions/Classes/CarritoCompras'
import { Cliente } from '../../Definitions/Classes/Cliente';
import { Empleado } from '../../Definitions/Classes/Empleado'
import { Ventana } from '../../Definitions/Classes/Ventana';
import { Vidrio } from '../../Definitions/Classes/Vidrio';
import { Cotizacion } from './Cotizacion';
import { useNavigate } from 'react-router-dom';

export default function HomePage(): JSX.Element {

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/add');
  }
  
  const empleado1 = new Empleado({
    infoPersonal: {
      nombre: 'Juan',
      apellido: 'Perez'
    },
    correoPrincipal: 'juanperez@gmail.com',
    telefonoPrincipal: '1234567890',
    contrasena: '123456'
  });

  const cliente1 = new Cliente({
    nombre: 'Mariana',
    apellido: 'Hernandez',
  })

  const al1 = new Aluminio(10)
  al1.refertenciaSeleccionada = 'a1'
  const al2 = new Aluminio(20)
  al2.refertenciaSeleccionada = 'a2'
  const v1 = new Vidrio(10)
  v1.refertenciaSeleccionada = 'v1'

  const miVenta = new Ventana();

  miVenta.aluminio = al2
  miVenta.vidrio = v1

  const miVenta2 = new Ventana()

  miVenta2.aluminio = al2
  miVenta2.vidrio = v1

  const miVenta3 = new Ventana()

  miVenta3.aluminio = al2
  miVenta3.vidrio = v1

  const miCarrito = new CarritoCompras(empleado1, cliente1);
  miCarrito.agregarProducto(miVenta);
  miCarrito.agregarProducto(miVenta2);
  miCarrito.agregarProducto(miVenta3);
  miCarrito.calcularMateriales();

  const infCot = {
    nombreCliente: miCarrito.datosComprador.informacionPersonal.nombre + ' ' + miCarrito.datosComprador.informacionPersonal.apellido,
    fecha: new Date(),
    numeroProductos: miCarrito.listaProductos.length,
    total: 1200000
  }

  return (
    <section className='bg-white' >

      <section className='flex justify-center gap-2 my-2'>
        <SearchBar />  
        <button onClick={handleAdd} className='min-w-[8%] bg-indigo_dye py-1 px-3 text-platinium text-lg rounded-lg hover:bg-cerulean shadow-xl transition-all'>
          <AddIcon sx={{ fontSize: 35 }}/>
        </button>    
      </section>

      <Cotizacion 
      fecha={infCot.fecha}
      nombreCliente={infCot.nombreCliente}
      numeroProductos={infCot.numeroProductos}
      total={infCot.total} />
    </section>
  );
}