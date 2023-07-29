import AutoCOmpleteInput from '../../Components/AutoCompleteInput'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import BotonToggle from '../../Components/BotonToggle'

export default function FormularioComprador(): JSX.Element {
  return (
    <section className="block divide-y-2 divide-platinium sm:block sm:divide-y md:grid md:grid-cols-2 md:divide-x-2 md:divide-y-0">

      <section className="space-y-3 my-3 mx-[5%] md:mx-[10%]">
        <AutoCOmpleteInput />
        <div className="relative w-full mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:r∂ing-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm"
        >
          <input type="email" id="userMail" 
          className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder="Correo electronico" />
        </div>
        <div className="relative w-full mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
          <input type="number" id="userNumber" 
          className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder="Número telefonico" />
        </div>
        <div className="relative w-full mt-1 max-h-fit cursor-defaul overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cerulean sm:text-sm">
          <input type="number" id="userNumber" 
          className="w-full h-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0" placeholder="Segundo número telefonico" />
        </div>
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