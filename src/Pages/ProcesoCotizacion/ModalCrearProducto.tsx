import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ListaOpciones from '../../Components/ListaOpciones'
import { PRODUCTOS_MANEJADOS } from '../../utils/constantes'
import CheckIcon from '@mui/icons-material/Check';
import { useCarrito } from '../../Hooks/Carritos';
import { useSelección } from '../../Hooks/Seleciones';
import { Ventana } from '../../Definitions/Classes/Ventana';
import { Producto } from '../../Definitions/Interfaces/Producto';

export default function ModalCrearProducto() {
  const [isOpen, setIsOpen] = useState(false)
  const [medidas, setMedidas] = useState({ ancho: 0, alto: 0 })
  const carrito = useCarrito();
  const selec = useSelección();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedidas({
      ...medidas,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateProduct = () => {
    let newProduct
    if(selec.getSeleccion('Tipo de Producto') === 'Ventana') newProduct = new Ventana(medidas, selec.getSeleccion('Referencia'));

    carrito.carrito.agregarProducto(newProduct as Producto);
    carrito.actualizarCarrito(carrito.carrito);
  }

  function closeModal() {
    if((selec.getSeleccion('Referencia') !== 'No encontrado' && selec.getSeleccion('Tipo de Producto') !== 'Tipo de Producto') && (medidas.alto > 0 && medidas.ancho > 0)) {
      handleCreateProduct();
      setIsOpen(false)
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className=" w-ull inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="w-full rounded-md px-4 py-1 text-sm font-medium text-platinium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Añadir nuevo producto
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-platinium p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Configuración de Producto
                  </Dialog.Title>
                  <div className="mt-5 w-full">
                    <section className='gap-3 space-y-3 md:flex md:space-y-0'>
                      <ListaOpciones
                      opciones={PRODUCTOS_MANEJADOS}
                      base='Tipo de Producto' 
                      isTargetting={false}
                      />
                      <ListaOpciones
                      opciones={['No encontrado']}
                      base='Referencia'
                      isTargetting={true} 
                      target='Tipo de Producto'
                      />
                    </section>
                    <section className='block text-sm space-y-3 font-normal mt-3'>
                      <div className='flex justify-between items-center'>
                        <strong>Ancho del Producto</strong>
                        <input type="number" id="anchoProducto" name='ancho' onChange={handleInput} required
                        className="w-[40%] md:w-[50%] shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='metros'/>
                      </div>
                      <div className='flex justify-between items-center'>
                        <strong>Alto del producto</strong>
                        <input type="number" id="altoProducto" name='alto' onChange={handleInput} required
                        className="w-[40%] md:w-[50%] shadow-md rounded-lg h-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder='metros' />
                      </div>
                    </section>
                  </div>

                  <div className="flex mt-4 justify-center">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black hover:text-platinium hover:bg-cerulean focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean focus-visible:ring-offset-2 hover:shadow-lg transition-all gap-2 items-center"
                      onClick={closeModal}
                    >
                      Añadir al carrito
                      <CheckIcon fontSize='medium' />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}