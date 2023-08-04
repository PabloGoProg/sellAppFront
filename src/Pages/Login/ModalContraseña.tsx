import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock';

export default function ModalContraseña() {
  const [isOpen, setIsOpen] = useState(false)
  const [changePasswordData, setChangePasswordData] = useState({
    userMail: '',
    newPassword: '',
    newPasswordConfirmation: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordData({
      ...changePasswordData,
      [event.target.name]: event.target.value,
    });
  };

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="w-fit inset-0 flex">
        <button
          type="button"
          onClick={openModal}
          className="w-full rounded-md px-4 py-0.5 text-xs font-light text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Olvidaste la contraseña?
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <div className='absolute top-2 right-2 hover:bg-gray-200 hover:text-red-500'>
                    <button onClick={closeModal} >
                      <CloseIcon />
                    </button> 
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Cambio de contraseña
                  </Dialog.Title>
                  <div className="mt-5 w-full rounded-md ">
                    <form action="" className='mx-[1%] sm:mx-[5%] space-y-3'>
                      <div className='relative flex items-center text-gray-400 focus-within:text-gray-600 transition-all'>
                        <EmailIcon className='absolute ml-2' />
                        <input 
                        className="w-full px-10 py-1 text-sm md:text-base bg-gray-200 focus:outline-none rounded-md border-none focus:ring-0 focus:border-lapis_lazuli" placeholder="Correo electronico" 
                        type="email" 
                        required
                        name='userEmail'
                        onChange={handleChange} />
                      </div>
                      <div className='relative flex items-center text-gray-400 focus-within:text-gray-600 transition-all'>
                        <LockIcon className='absolute ml-2' />
                        <input 
                        className="w-full px-10 py-1 text-sm md:text-base bg-gray-200 focus:outline-none rounded-md border-none focus:ring-0 focus:border-lapis_lazuli" placeholder="Nueva contraseña" 
                        type="password" 
                        required
                        name='newPassword'
                        onChange={handleChange} />
                      </div>
                      <div className='relative flex items-center text-gray-400 focus-within:text-gray-600 transition-all'>
                        <LockIcon className='absolute ml-2'/>
                        <input 
                        className="w-full px-10 py-1 text-sm md:text-base bg-gray-200 focus:outline-none rounded-md border-none focus:ring-0 focus:border-lapis_lazuli" placeholder="Confirmar contraseña" 
                        type="password" 
                        required
                        name='newPasswordConfirmation'
                        onChange={handleChange} />
                      </div>
                      <div className='flex justify-center items-center'>
                        <button className='w-full bg-blue-600 py-1 rounded-md mt-3 text-white hover:bg-blue-800 transition-all'>
                          Realizar cambio
                        </button>
                      </div>
                    </form>
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