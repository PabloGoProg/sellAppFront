import { useEffect, useState } from "react";
import VentanaDesplegable from "../../Components/VentanaDesplegable";
import { useCarrito } from "../../Hooks/Carritos"; // Importa el contexto y el hook useCarrito
import FormularioComprador from "./FormularioComprador";
import ModalCrearProducto from "./ModalCrearProducto";
import { SeleccionProvider } from "../../Hooks/Seleciones";
import { Producto } from "../../Definitions/Interfaces/Producto";
import VentanaProductos from "./VentanaProducto";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function CotizacionesPage() {
  const { carrito, nProductos } = useCarrito(); // Aquí usas directamente el valor del carrito desde el contexto
  const [listadoProductos, setListadoProductos] = useState<Producto[]>([]);

  console.log(carrito.listaProductos)

  // Actualizar el estado listadoProductos cuando cambie la lista de productos del carrito
  useEffect(() => {
    setListadoProductos(carrito.listaProductos);
  }, [nProductos]);

  return (
    <section className="w-full space-y-4 my-4">
      {/* Primera sección: Datos del usuario y tipo de contacto */}
      <section className="w-full">
        <VentanaDesplegable 
          baseOpen={true}
          titular="Sección 1 - Datos del comprador y contacto"
          contenido={<FormularioComprador />}
        />
      </section>

      <VentanaDesplegable 
      baseOpen={false}
      titular="Secciön 2 - Productos del Carrito"
      contenido={
        <section>
          <section className="my-3">
            <ul className="space-y-3">
              {listadoProductos.map((producto, index) => {
                return (
                  <VentanaProductos producto={producto} productIndex={index} key={index} />
                )
              })}
            </ul>
          </section>

          <section className='w-full'>
            <SeleccionProvider>
              {/* Pasa la función actualizarCarrito al componente ModalCrearProducto */}
              <ModalCrearProducto />
            </SeleccionProvider>
          </section>
        </section>
      } />

      <VentanaDesplegable 
      titular="Sección 3 - Descuento de la venta"
      baseOpen={false}
      contenido={
        <section className="space-y-5 mt-3">

          <div className="flex justify-between">
            <div className="flex gap-2 place-items-center">
              <MoneyOffIcon fontSize='medium' className="flex justify-center" />
              <p className="font-semibold" >Descuento general</p>
            </div>
            <div className="relative w-[50%] mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
              <input type="number" id="descuentoGeneral" 
              className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" />
            </div>
          </div>

          <div className="flex justify-center gap-1 place-items-center text-center">
            <PriorityHighIcon fontSize='medium' />
            <p>Si el valor ingresado esta por debajo de 100, el descuento será tomado como un <strong>porcentaje.</strong> Si el valor es mayor, será tomado cómo una <strong>cantidad monetaría.</strong></p>
          </div>

        </section>
      } />

      <VentanaDesplegable 
      titular="Sección 4 - Finalización de compra"
      baseOpen={false}
      contenido={
        <section className="w-full gap-5 md:flex">

        <div className="w-full md:w-[70%] flex flex-col gap-4 justify-center my-4">
          <button className="w-full rounded-xl hover:bg-cerulean hover:shadow-lg transition-all px-4 py-3 bg-indigo_dye text-white font-medium">
            Guardar Borrador
          </button>
          <button className="w-full rounded-xl hover:bg-cerulean hover:shadow-lg transition-all px-4 py-3 bg-indigo_dye text-white font-medium">
            Finalizar
          </button>
        </div>

        <div className="w-full flex justify-center items-center mt-4 md:mt-0">
        <section className='flex gap-1 md:gap-4'>
          <section className='my-auto'>
            <ShoppingCartIcon sx={{ fontSize: 50 }} />
          </section>

          <section className='text-black w-full md:min-w-full text-xs md:text-sm lg:text-base font-semibold pl-2 md:pl-4 border-l' >
            {carrito.listaProductos.map((producto, index) => {
              return (
                <div className='w-full flex justify-between' key={index}>
                  <p> {producto.constructor.name} - {producto.refertenciaSeleccionada} {producto.medidas.alto} m x {producto.medidas.ancho} m: </p>
                  <p className="text-green"> {producto.precio} </p>
                </div>
              )
            })}
            <div className='flex justify-between border-t-2'>
              <p>Coste final:</p>
              <p> {carrito.getPrecioTotal()} </p>
            </div>
          </section>
        </section>
        </div>

      </section>} />

    </section>
  );
}
