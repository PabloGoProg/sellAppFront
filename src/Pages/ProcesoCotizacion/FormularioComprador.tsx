import { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import BotonToggle from '../../Components/BotonToggle'
import type { informacionPersonal } from '../../Definitions/types';
import CheckIcon from '@mui/icons-material/Check';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import { useCarrito } from '../../Hooks/Carritos'
import { Usuario } from '../../Definitions/Classes/Usuario'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

export default function FormularioComprador(): JSX.Element {

  const { carrito, actualizarCarrito } = useCarrito()
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')
  const [cliente, setCliente] = useState<informacionPersonal>({
    nombre: '',
    correo: '',
    telefono: '',
    telefonoSecundario: '',
  });

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    carrito.datosComprador = new Usuario(cliente);
    actualizarCarrito(carrito);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  return (
    <section className="block divide-y-2 divide-platinium sm:block sm:divide-y md:grid md:grid-cols-2 md:divide-x-2 md:divide-y-0">

      <section className="space-y-3 my-3 mx-[5%] md:mx-[10%]">

        <form onSubmit={handleSubmmit}>

          <div className='w-full'>
            <Combobox
              name="nombre"
              value={selectedPerson}
              onChange={setSelectedPerson}
            >
              <div className='relative'>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
                  <Combobox.Input
                  className="w-full border-none py-1.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                    name='nombre'
                    placeholder='Nombre del cliente'
                    onChange={(event) => 
                    {
                      setQuery(event.target.value)
                      handleChange(event)
                    }}  
                    displayValue={(person: {id: number, name: string} ) => {
                      cliente.nombre = person.name
                      return person.name
                    }}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <UnfoldMoreIcon
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                      />
                  </Combobox.Button>
                </div>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')} >
                  
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 z-10 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredPeople.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-black text-opacity-70">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-1.5 pl-10 pr-4 ${
                            active ? 'bg-cerulean text-white' : 'text-black text-opacity-90'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-cerulean'
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
              </div>
            </Combobox>
          </div>
        
          <div className="relative w-full mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:r∂ing-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm"
          >
            <input 
            className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" 
            placeholder="Correo electronico"
            type="email"
            name='correo'
            value={cliente.correo}
            onChange={handleChange} 
            id="userMail" />
          </div>
          <div className="relative w-full mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
            <input 
            className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" 
            placeholder="Número telefonico" 
            type="text" 
            name='telefono'
            value={cliente.telefono}
            onChange={handleChange}
            required
            id="userNumber" />
          </div>
          <div className="relative w-full mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
            <input 
            className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" 
            placeholder="Segundo número telefonico"
            name='telefonoSecundario'
            value={cliente.telefonoSecundario}
            onChange={handleChange}
            type="text" 
            id="userNumber" />
          </div>
          <button className='w-full bg-indigo_dye rounded-lg py-2 mt-4 hover:shadow-lg hover:bg-cerulean text-platinium transition-all'>
            Agregar cliente
          </button>
        </form>

      </section>

      <section className='space-y-2 md:my-auto'>

        <h3 className='text-base lg:text-lg xl:text-xl text-center font-semibold mb-3' >Seleccione el tipo de contacto</h3>

        <div className="flex justify-between mx-[5%] md:mx-[10%] text:sm lg:text-lg xl:text-xl">

          <section className='flex gap-1 items-center font-semibold'>
            <EmailIcon fontSize='medium' />
            <p>Correo</p>  
          </section>

          <BotonToggle encendido={true} />

        </div>
        <div className="flex justify-between mx-[5%] md:mx-[10%] text:sm lg:text-lg xl:text-xl">

          <section className='flex gap-1 items-center font-semibold'>
            <WhatsAppIcon fontSize='medium' />
            <p>WhatsApp</p>
          </section>

          <BotonToggle encendido={true} />

        </div>

      </section>

    </section>
  )
}