import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useCarrito } from '../../Hooks/Carritos';
import DeleteIcon from '@mui/icons-material/Delete'

export default function ModalEliminar(props: { keyProducto: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const carrito = useCarrito();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen(true)
  }

  const handleDelete = () => {
    carrito.carrito.eliminarProducto(props.keyProducto);
    carrito.actualizarCarrito(carrito.carrito);
    closeModal();
  }

  return (
    <>
      <div className="w-fit inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="min-w-full flex justify-center items-center rounded-md bg-slate-300 px-2 gap-2 py-1 text-sm font-medium text-black hover:shadow-lg hover:bg-red-700 hover:text-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <DeleteIcon />
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <section className='flex flex-col gap-5 justify-center items-center'>
                    <span>
                      Desea eliminar el producto de la lista?                      
                    </span>
                    <div className=''>
                      <button
                      className='flex gap-2 rounded-lg bg-slate-300 px-4 py-1.5 hover:bg-red-600 hover shadow-lg hover:text-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                      onClick={handleDelete}>
                        <DeleteIcon />
                        Confirmar
                      </button>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}