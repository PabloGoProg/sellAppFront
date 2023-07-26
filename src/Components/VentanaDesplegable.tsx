import { Disclosure } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function VentanaDesplegable(props: {titular: string, contenido: JSX.Element} ): JSX.Element {

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className={`flex w-full justify-between rounded-lg px-4 bg-platinium py-2 text-left text-base font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-platinium focus-visible:ring-opacity-75 ${open ? 'shadow-2xl' : ''}`}>
                <span> {props.titular} </span>
                <KeyboardArrowDownIcon
                  className={`${
                    open ? 'rotate-180 transform text-black' : ''
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={`px-4 pb-3 pt-2 text-sm text-black bg-platinium ${open ? 'bg-opacity-20 rounded-xl' : ''}`}>
                {props.contenido}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
