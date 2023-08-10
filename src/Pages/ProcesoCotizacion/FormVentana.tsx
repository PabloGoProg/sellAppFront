import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useCarrito } from '../../Hooks/Carritos'
import { Ventana } from '../../Definitions/Classes/Ventana';

export default function FormVentana(props: { productIndex: number }): JSX.Element {
  const [enabled, setEnabled] = useState(false)
  const carrito = useCarrito();

  useEffect(() => {
    (carrito.carrito.listaProductos[props.productIndex] as Ventana).exterior = enabled;
    carrito.actualizarCarrito(carrito.carrito);
  }, [enabled])

  const handleNaves = (event: React.ChangeEvent<HTMLInputElement>) => {
    (carrito.carrito.listaProductos[props.productIndex] as Ventana).numeroCuerpos = parseInt(event.target.value);
    carrito.actualizarCarrito(carrito.carrito);
  }

  return (
    <section className='mx-[5%] space-y-2'>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Ancho</span>
        <input type="number" id="anchoProducto" name='ancho'required
        className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='metros'/>
      </div>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Alto</span>
        <input type="number" id="altoProducto" name='alto' required
        className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='metros' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Naves</span>
        <input type="number" id="nCuerpos" name='nCuerpos' required
        onChange={handleNaves}
        className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='Cantidad' />
      </div>
      <div className='flex justify-between items-center'>
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
    </section>
  )
}