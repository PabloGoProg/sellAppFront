import { Fragment, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { Ventana } from '../../Definitions/Classes/Ventana/Ventana';
import { referenciasVidrio, componenteCierre } from '../../utils/constantes';
import { Listbox, Transition } from '@headlessui/react'
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Vidrio } from '../../Definitions/Classes/Vidrio';
import { ComponenteProducto } from '../../Definitions/Classes/ComponenteProducto';

export default function FormVentana(props: { producto: Ventana, productIndex: number, actualizar: Function }): JSX.Element {

  const [vidrioSeleccionado, setVidrioSeleccionado] = useState({ nombre: 'Vidrio', precio: 0 }  as { nombre: string, precio: number });
  const [enabled, setEnabled] = useState(props.producto.exterior);
  const [cierreSeleccionado, setCierreSeleccionado] = useState({ nombre: 'Cierre', precio: 0 }  as { nombre: string, precio: number });

  useEffect(() => {
    if(props.producto.vidrio) setVidrioSeleccionado({ nombre: props.producto.vidrio?.refertenciaSeleccionada as string, precio: props.producto.vidrio?.precio as number })
  }, [])

  useEffect(() => {
    props.producto.exterior = enabled;
    props.actualizar();
  }, [enabled])

  useEffect(() => {
    if(vidrioSeleccionado.nombre !== 'Vidrio') {
      props.producto.vidrio = new Vidrio(vidrioSeleccionado.precio, vidrioSeleccionado.nombre);
      props.actualizar();
    }
  }, [vidrioSeleccionado])

  useEffect(() => {
    if(cierreSeleccionado.nombre !== 'Cierre') {
      props.producto.añadirComponentes(new ComponenteProducto({
        nombre: 'Cierre',
        precioUnidad: cierreSeleccionado.precio,
        referencia: cierreSeleccionado.nombre,
        cantidad: 1,
      }), "Cierre")
      props.actualizar();
    }
  }, [cierreSeleccionado])

  const handleNaves = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.producto.setNumeroCuerpos(parseInt(event.target.value));
    props.actualizar();
  }

  return (
    <section className='mx-[5%] space-y-3 py-5'>
      <div>
        <Listbox value={vidrioSeleccionado} onChange={setVidrioSeleccionado}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{vidrioSeleccionado.nombre}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <KeyboardArrowDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {referenciasVidrio.map((vidrio, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={vidrio}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {vidrio.nombre}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className='flex justify-between items-center'>
        <span className='w-1/5'>Naves</span>
        <input type="number" id="nCuerpos" name='nCuerpos' defaultValue={props.producto.numeroCuerpos} required
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
      <div>
        <Listbox value={cierreSeleccionado} onChange={setCierreSeleccionado}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{cierreSeleccionado.nombre}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <KeyboardArrowDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {componenteCierre.map((cierre, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={cierre}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {cierre.nombre}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </section>
  )
}