import { useState } from 'react'
import { IMAGES } from "../const"

export function Login(): JSX.Element {

  const [forgotPassword, setForgotPassword] = useState<boolean>(false)

  return (
    // Manjeador del fondo de la pantalla de login
    <section  
    className="bg-gradient-to-tr from-platinium to-lapis_lazuli w-full h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center bg-blend-screen"
    style={{
      backgroundImage: `linear-gradient(to top right, #868686, #001022), url(${IMAGES.LOGIN_BACKGROUND})`,
    }}>

      {/* Seccion del contenido del login */}
      <section
      className="bg-gradient-to-tl from-lapis_lazuli to-indigo_dye max-h-fit w-4/5 md: max-w-xl px-5 py-5 bg-platinium rounded-lg shadow-2xl">

        <form className="flex flex-col w-full px-5 gap-2 my-3 sm:px-0">

          <h2 
          className="text-center font-semibold text-xl sm:text-2xl md:text-3xl text-sky_blue antialiased mb-5">
            Bienvenido nuevamente!
          </h2>

          <div className="flex flex-col">
            <label about="correo" className="block antialiased text-sky_blue text-base mb-1 sm:text-sm">Correo Electronico</label>
            <input type="text" id="username" 
            className="border w-full px-2 py-1 text-base bg-platinium focus:outline-none border-none rounded-lg focus:ring-0 focus:border-lapis_lazuli" placeholder="Ingrese su correo" />
          </div>

          <div className="flex flex-col mb-8">
            <label about="password" className="block antialiased text-sky_blue text-base sm:text-sm mb-1">Contraseña de usuario</label>
            <input type="password" id="password" 
            className="w-full px-2 py-1 text-base bg-platinium focus:outline-none rounded-lg border-none focus:ring-0 focus:border-lapis_lazuli" placeholder="Ingrese su contraseña" />
          </div>
          {/* <a className="text-sky_blue mb-8 text-right py-0 text-sm antialiased sm:text-xs" href="http://www.google.com">Has olvidado tu contraseña?</a> */}
          <button
          className="w-full bg-indigo_dye py-1 text-platinium text-lg rounded-lg hover:bg-cerulean shadow-xl transition-all">Inciar sesión</button>

        </form>

      </section>

    </section>
  )
}