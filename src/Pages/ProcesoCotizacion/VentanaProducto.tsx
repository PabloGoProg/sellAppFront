import { useEffect, useState, Fragment } from 'react';
import { Disclosure } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Producto } from '../../Definitions/Interfaces/Producto';
import ModalEliminar from './ModalEliminar';
import FormVentana from './FormVentana';
import { useCarrito } from '../../Hooks/Carritos';
import CostesProducto from './CostesProducto';

const aluminio = [
  { id: 1, name: 'Normal' },
  { id: 2, name: 'Cepillado' },
  { id: 3, name: 'Dorado' },
]

export default function VentanaProductos(props: {producto: Producto, productIndex: number}): JSX.Element {
  const [titulo, setTitulo] = useState<string>('');
  const [aluminioSeleccionado, setAluminioSeleccionado] = useState(aluminio[0])
  const [cantidadProducto, setCantidadProducto] = useState<number>(1);
  const { carrito } = useCarrito();

  const handleCantidad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value !== '') setCantidadProducto(parseInt(event.target.value));
  }

  useEffect(() => {
    setTitulo(`${props.producto.constructor.name} - ${props.producto.refertenciaSeleccionada}: ${props.producto.medidas.alto}m x ${props.producto.medidas.ancho}m ( ${cantidadProducto} )`);
  }, [carrito.listaProductos[props.productIndex], cantidadProducto])

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
                
                  <section className='my-3'>

                    <form className='flex flex-col md:grid md:grid-cols-2 gap-2 border-b-2'>
                      <div className='mx-[5%] space-y-2 border-b-2 border-gray-300 py-5'>
                        <div className='flex items-center space-x-6 md:space-x-4'>
                          <p className='w-1/5'>Aluminio</p>
                          <Listbox
                            value={aluminioSeleccionado}
                            onChange={setAluminioSeleccionado}
                            name="assignee"
                          >
                            <div className='relative w-full'>
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{aluminioSeleccionado.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute w-full mt-1 max-h-60 z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 hover:cursor-pointer focus:outline-none sm:text-sm">
                                  {aluminio.map((referencia) => (
                                    <Listbox.Option
                                      className={({ active }) =>
                                        `cursor-default select-none py-2 pl-10 pr-4 ${
                                          active ? 'bg-cerulean text-blue-600 cursor-pointer' : 'text-black'
                                        }`
                                      }
                                      key={referencia.id} value={referencia}>
                                      {referencia.name}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                        <div className='flex items-center space-x-6 md:space-x-4'>
                          <p className='w-1/5'>Vidirio</p>
                          <Listbox
                            value={aluminioSeleccionado}
                            onChange={setAluminioSeleccionado}
                            name="assignee"
                          >
                            <div className='relative w-full'>
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{aluminioSeleccionado.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute w-full mt-1 max-h-60 z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 hover:cursor-pointer focus:outline-none sm:text-sm">
                                  {aluminio.map((referencia) => (
                                    <Listbox.Option
                                      className={({ active }) =>
                                        `cursor-default select-none py-2 pl-10 pr-4 ${
                                          active ? 'bg-cerulean text-blue-600 cursor-pointer' : 'text-black'
                                        }`
                                      }
                                      key={referencia.id} value={referencia}>
                                      {referencia.name}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span className='w-1/5'>Cantidad</span>
                          <input type="number" id="cantidadProductos" name='cantidadProductos' defaultValue={cantidadProducto} required
                          onChange={handleCantidad}
                          className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='Cantidad' />
                        </div>
                        <div className='flex justify-between items-center'>
                          <span className='w-1/5'>Descuento</span>
                          <input type="number" id="descuento" name='descuento' defaultValue={cantidadProducto} required
                          onChange={handleCantidad}
                          className="w-3/5 md:w-4/5 shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='Cantidad' />
                        </div>
                        <CostesProducto produto={props.producto} cantidad={cantidadProducto} />
                      </div>
                      <div>
                        <FormVentana productIndex={props.productIndex}/>
                      </div>
                    </form>

                  </section>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
