import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import CheckIcon from '@mui/icons-material/Check';

const people = [
  { id: 1, nombre: 'Wade Cooper' },
  { id: 2, nombre: 'Arlene Mccoy' },
  { id: 3, nombre: 'Devon Webb' },
  { id: 4, nombre: 'Tom Cook' },
  { id: 5, nombre: 'Tanya Fox' },
  { id: 6, nombre: 'Hellen Schmidt' },
]

export default function AutoCOmpleteInput() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.nombre
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="w-full">
        <Combobox 
        value={selected} 
        onChange={setSelected} 
        name="nombre" >
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
              <Combobox.Input 
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                required
                displayValue={(person: {id: number, nombre: string}) => person.nombre}
                onChange={(event) => setQuery(event.target.value)}
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
              afterLeave={() => setQuery('')}
            >
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
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
                            {person.nombre}
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
  )
}