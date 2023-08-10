import { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock';
import ModalContraseña from '../Login/ModalContraseña';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../Hooks/Auth';

export function Login(): JSX.Element {

  const auth = useAuth();
  const [forgotPassword, setForgotPassword] = useState<boolean>(false)
  const [userData, setUserData] = useState({
    correo: '',
    contrasena: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const mailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');

    if(mailRegex.test(userData.correo) && passwordRegex.test(userData.contrasena)) {
      auth?.login(userData);
    }
  }


  // *9999
  // 018000517677  
  return (
    // Manjeador del fondo de la pantalla de login
    <section  
    className="bg-gradient-to-tr from-blue-950 to-blue-800 w-full h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center bg-blend-screen" >

      {/* Seccion del contenido del login */}
      <section
      className="bg-white max-h-fit w-4/5 sm:w-3/5 md:w-2/5 px-1 py-5 rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col w-full px-4 gap-2 my-3">

          <div className='flex gap-1 justify-center items-center mb-5'>
            <PersonIcon fontSize='large' />
            <h2 
            className="font-semibold text-xl md:text-2xl antialiased">
              Bienvenido
            </h2>
          </div>

          <div className='relative flex items-center text-gray-400 focus-within:text-gray-600 transition-all'>
            <EmailIcon className="absolute ml-2" />
            <input 
            className="border w-full px-10 py-1 text-sm md:text-base bg-gray-200 focus:outline-none border-none rounded-md focus:ring-0 focus:border-lapis_lazuli" 
            placeholder="Correo electronico" 
            name='correo'
            required
            onChange={handleChange}
            type="text" />
          </div>

          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 transition-all">
            <LockIcon className="absolute ml-2" />
            <input 
            className="w-full px-10 py-1 text-sm md:text-base bg-gray-200 focus:outline-none rounded-md border-none focus:ring-0 focus:border-lapis_lazuli" placeholder="Contraseña" 
            type="password" 
            required
            name='contrasena'
            onChange={handleChange} />
          </div>
          {/* <a className="text-sky_blue mb-8 text-right py-0 text-sm antialiased sm:text-xs" href="http://www.google.com">Has olvidado tu contraseña?</a> */}
          <button 
          className="w-full mt-5 bg-blue-600 py-1 text-white text-lg rounded-md hover:bg-cerulean shadow-xl hover:bg-blue-800 transition-all">
            Inciar sesión
          </button>

        </form>

        <div className="flex justify-center items-center mt-10">
          <ModalContraseña />
        </div>

      </section>

    </section>
  )
}