import type { infoCotizacion } from '../../Definitions/types'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ReceiptIcon from '@mui/icons-material/Receipt';

export function Cotizacion(props: infoCotizacion): JSX.Element {

  const formatDate = (date: Date): string => {
    const formatedDate = date.toUTCString().split(' ');
    formatedDate.pop();
    return formatedDate.join(' ');
  }

  const showCurrency = (value: number): string => {
    return value.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
  }

  return (
    <section className="bg-platinium rounded-lg mx-auto my-2 px-5 py-2 shadow-xl w-[95%] h-fit antialiased" >

      <section className='flex justify-between font-extrabold mb-2 gap-2 text-xs md:text-sm text-cerulean border-b-2 bottom-1'>
        <p className='text-left'> {props.nombreCliente} </p>
        <p className='text-right'> {formatDate(props.fecha)} </p>
      </section>

      <div className='md:flex md:justify-between'>
        <section className='flex gap-1 md:gap-4'>
          <section className='my-auto'>
            <ShoppingCartIcon sx={{ fontSize: 50 }} />
          </section>

          <section className='text-black w-full md:min-w-full text-xs font-semibold pl-2 md:pl-4 border-l' >
            <div className='flex justify-between'>
              <p>Numero de productos:</p>
              <p> {props.numeroProductos} </p>  
            </div>
            <div className='flex justify-between'>
              <p>Coste total:</p>
              <p className='text-green'> {showCurrency(props.total)} </p>
            </div>
            <div className='flex justify-between border-b-2'>
              <p>Descuento:</p>
              <p className='text-red'> {`- ${showCurrency(0)}`} </p>
            </div>
            <div className='flex justify-between'>
              <p>Coste final:</p>
              <p> {showCurrency(props.total)} </p>
            </div>
          </section>
        </section>

        <section className='max-w-fit space-x-2 mt-1 mx-auto sm:mx-auto sm:mt-1 md:mx-0 md:my-auto md:max-w-fit'>
          <button className='bg-cerulean px-9 md:px-2 py-1 rounded-lg text-platinium hover:shadow-xl hover:scale-105' >
            <SwitchAccountIcon sx={{ fontSize: 35 }}/>
          </button>
          <button className='bg-cerulean px-11 md:px-2 py-1 rounded-lg text-platinium hover:shadow-xl hover:scale-105' >
            <ReceiptIcon sx={{ fontSize: 35 }}/>
          </button>
        </section>
      </div>


    </section>
  );
}
