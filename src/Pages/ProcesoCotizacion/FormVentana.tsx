import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useCarrito } from '../../Hooks/Carritos'
import { Ventana } from '../../Definitions/Classes/Ventana/Ventana';
import ListaOpciones from '../../Components/ListaOpciones';

export default function FormVentana(props: { productIndex: number }): JSX.Element {
  const carrito = useCarrito();
  const [producto, setProducto] = useState(carrito.carrito.listaProductos[props.productIndex] as Ventana);
  const [enabled, setEnabled] = useState(producto.exterior);

  useEffect(() => {
    (carrito.carrito.listaProductos[props.productIndex] as Ventana).setExterior(enabled);
    (carrito.carrito.listaProductos[props.productIndex] as Ventana).calcularCostoPartes();
    carrito.actualizarCarrito(carrito.carrito);
    setProducto(carrito.carrito.listaProductos[props.productIndex] as Ventana);
  }, [enabled])

  const handleNaves = (event: React.ChangeEvent<HTMLInputElement>) => {
    (carrito.carrito.listaProductos[props.productIndex] as Ventana).setNumeroCuerpos(parseInt(event.target.value));
    carrito.actualizarCarrito(carrito.carrito);
    setProducto(carrito.carrito.listaProductos[props.productIndex] as Ventana);
  }

  return (
    <section className='mx-[5%] space-y-2 border-b-2 border-gray-300 py-5'>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Ancho</span>
        <input type="number" id="anchoProducto" name='ancho' required defaultValue={producto.medidas.ancho} 
        className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='metros'/>
      </div>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Alto</span>
        <input type="number" id="altoProducto" name='alto' defaultValue={producto.medidas.alto} required
        className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='metros' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Naves</span>
        <input type="number" id="nCuerpos" name='nCuerpos' defaultValue={producto.numeroCuerpos} required
        onChange={handleNaves}
        className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='Cantidad' />
      </div>
      <div className='flex justify-between items-center border-b-2 border-gray-300 pb-5'>
        <span>Exterior</span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-green-600' : 'bg-red-500'
          } relative inline-flex h-9 w-20 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-12' : 'translate-x-1'
            } inline-block h-7 w-7 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      <div className='space-y-2 pt-4'>
        <ListaOpciones 
        base='Rodachines' 
        opciones={['Nailon', 'Dobles']}
        isTargetting={false}/> 
        <ListaOpciones 
        base='Manijas' 
        opciones={['Sencillas', 'Dobles']}
        isTargetting={false}/> 
        <ListaOpciones 
        base='Cierre' 
        opciones={['Media luna', 'Chapa impacto']}
        isTargetting={false}/> 
      </div>
    </section>
  )
}