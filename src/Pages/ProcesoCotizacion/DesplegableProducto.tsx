import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Producto } from '../../Definitions/Interfaces/Producto';
import ModalEliminar from './ModalEliminar';
import FormVentana from './FormVentana';
import { useCarrito } from '../../Hooks/Carritos';
import CostesProducto from './CostesProducto';
import { Ventana } from '../../Definitions/Classes/Ventana/Ventana';

export default function DesplegableProducto(props: {producto: Producto, productIndex: number}): JSX.Element {
  const { producto } = props;
  const { carrito, actualizarCarrito } = useCarrito();

  function actualizarPrecioVentana() {
    props.producto.calcularPrecioTotal();
    carrito.listaProductos[props.productIndex] = props.producto;
    console.log('carrito', carrito.listaProductos[props.productIndex])
    actualizarCarrito(carrito);
  }

  const [titulo, setTitulo] = useState<string>(`${producto.constructor.name} - ${producto.refertenciaSeleccionada} - ${producto.medidas.ancho} m x ${producto.medidas.alto} m (${carrito.listaProductos[props.productIndex].cantidad})`);

  const handleChangeCantidad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value !== '' && event.target.value !== '0') {
      carrito.listaProductos[props.productIndex].cantidad = parseInt(event.target.value);
      setTitulo(`${producto.constructor.name} - ${producto.refertenciaSeleccionada} - ${producto.medidas.ancho} m x ${producto.medidas.alto} m (${carrito.listaProductos[props.productIndex].cantidad})`);
      actualizarCarrito(carrito);
    }
  }

  const handleChangeMedidas = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value !== '' && parseFloat(event.target.value) > 0) {
      event.target.name === 'ancho' ? props.producto.medidas.ancho = parseFloat(event.target.value) : props.producto.medidas.alto = parseFloat(event.target.value);
      setTitulo(`${producto.constructor.name} - ${producto.refertenciaSeleccionada} - ${producto.medidas.ancho} m x ${producto.medidas.alto} m (${carrito.listaProductos[props.productIndex].cantidad})`);
    }
    carrito.listaProductos[props.productIndex] = props.producto;
    carrito.listaProductos[props.productIndex].llenarPartes();
    actualizarCarrito(carrito);
  }

  useEffect(() => {
    console.log('precio', props.producto.precio)
  }, [props.producto.precio])

  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <>
              <div className='flex'>
                <Disclosure.Button className={`botton-borrar flex w-full justify-between rounded-lg px-4 bg-white py-2 text-left text-base font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-platinium focus-visible:ring-opacity-75 ${open ? 'shadow-2xl' : ''}`}>
                  <span className='text-xs py-1 sm:text-sm'> {titulo} </span>
                  <div className='flex space-x-3'>
                    <KeyboardArrowDownIcon
                      className={`${
                        open ? 'rotate-180 transform text-black' : ''
                      } h-5 w-5 text-black`}
                    />
                  </div>
                </Disclosure.Button>
                <div className='absolute right-[11%] py-1'>
                  <ModalEliminar keyProducto={props.productIndex} />
                </div>
              </div>
              <Disclosure.Panel className={`px-1 pb-3 pt-2 text-sm text-black bg-gray-300 ${open ? 'bg-opacity-20 rounded-xl' : ''}`}>

                {producto.constructor.name === 'Ventana' ? (
                  <div className='grid grid-cols-2'>
                    <section>
                      <FormVentana 
                      producto={props.producto as Ventana}
                      productIndex={props.productIndex} 
                      actualizar={actualizarPrecioVentana}/>
                    </section>
                    <section>
                      <div className='mx-[5%] space-y-3 py-5'>
                        <div className='flex justify-between items-center'>
                          <span className='w-1/5'>Ancho</span>
                          <input type="number" id="anchoProducto" name='ancho' required defaultValue={producto.medidas.ancho} 
                          className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                          placeholder='metros'
                          onChange={handleChangeMedidas} />
                        </div>
                        <div className='flex justify-between items-center'>
                          <span className='w-1/5'>Alto</span>
                          <input type="number" id="altoProducto" name='alto' defaultValue={producto.medidas.alto} required
                          className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" 
                          placeholder='metros' 
                          onChange={handleChangeMedidas} />
                        </div>
                        <div className='flex justify-between items-center'>
                          <span className='w-1/5'>Cantidad</span>
                          <input type="number" id="cantidadProducto" name='alto' defaultValue={carrito.listaProductos[props.productIndex].cantidad} required
                          className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='Cantidad de productos'
                          onChange={handleChangeCantidad} />
                        </div>
                        <div>
                          <CostesProducto produto={props.producto} />
                        </div>
                      </div>
                    </section>
                  </div>
                ) : <></>}

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
