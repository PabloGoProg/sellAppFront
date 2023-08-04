import { MouseEventHandler, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteIcon from '@mui/icons-material/Delete'
import { Producto } from '../../Definitions/Interfaces/Producto';

export default function VentanaProductos(props: {producto: Producto}): JSX.Element {
  const [titulo, setTitulo] = useState<string>('');

  useEffect(() => {
    setTitulo(`${props.producto.constructor.name} - ${props.producto.refertenciaSeleccionada}: ${props.producto.medidas.alto} m x ${props.producto.medidas.ancho} m`);
  }, [])

  const handleDelete = (event: MouseEventHandler) => {
    console.log(event)
  }

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <>
              <Disclosure.Button className={`botton-borrar flex w-full justify-between rounded-lg px-4 bg-platinium py-2 text-left text-base font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-platinium focus-visible:ring-opacity-75 ${open ? 'shadow-2xl' : ''}`}>
                <span> {titulo} </span>
                <div className='flex space-x-3'>
                  <button id='buttonDelete' className='max-w-fit max-h-fit px-2 py-0.5 bg-cerulean text-platinium rounded-lg hover:shadow-2xl hover:bg-red hover:text-black transition-all'>
                    <DeleteIcon fontSize='small' />
                  </button>
                  <KeyboardArrowDownIcon
                    className={`${
                      open ? 'rotate-180 transform text-black' : ''
                    } h-5 w-5 text-black`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className={`px-4 pb-3 pt-2 text-sm text-black bg-platinium ${open ? 'bg-opacity-20 rounded-xl' : ''}`}>
                Later
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
