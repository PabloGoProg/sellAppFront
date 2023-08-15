import { Fragment, useState, useEffect } from 'react'
import { useSelección } from '../Hooks/Seleciones';
import { Listbox, Transition } from '@headlessui/react'
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { REFRENCIAS_PROVICIONALES } from '../utils/constantes';

export default function ListaOpciones(props: { opciones: string[], base: string, isTargetting: boolean, target?: string }): JSX.Element {

  const [selected, setSelected] = useState(props.base);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.opciones);
  const seleccion = useSelección();

  useEffect(() => {
    seleccion.actualizarSeleccion(props.base, selected);
  }, [selected])

  const handleOptions = () => {
    if(props.isTargetting) {
      if(seleccion.getSeleccion('Tipo de Producto') === 'Ventana') setSelectedOptions(REFRENCIAS_PROVICIONALES.VENTANA);
      if(seleccion.getSeleccion('Tipo de Producto') === 'Puerta') setSelectedOptions(REFRENCIAS_PROVICIONALES.PUERTA);
      if(seleccion.getSeleccion('Tipo de Producto') === 'Barandal') setSelectedOptions(REFRENCIAS_PROVICIONALES.BARANDAL); 
    }
  }

  return (
    <div onClick={handleOptions} className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60 z-20 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 hover:cursor-pointer focus:outline-none sm:text-sm">
              {selectedOptions.map((element, key) => (
                <Listbox.Option
                  key={key}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-cerulean text-blue-500' : 'text-black'
                    }`
                  }
                  value={element}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {element}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cerulean">
                          <CheckIcon />
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
  )
}
