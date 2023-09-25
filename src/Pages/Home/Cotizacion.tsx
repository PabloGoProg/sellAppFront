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
    <section className="bg-gray-100 rounded-lg mx-auto my-2 px-5 py-2 shadow-md w-[95%] h-fit antialiased" >

      <section className='flex justify-between font-extrabold mb-2 gap-2 text-xs md:text-sm lg:text-base xl:text-xl text-blue-400 border-b-2 bottom-1'>
        <p className='text-left'> {props.nombreCliente} </p>
        <p className='text-right'> {formatDate(props.fecha)} </p>
      </section>

      <div className='flex flex-col md:flex-row w-full gap-4'>

        <section className='flex w-full md:w-2/3 items-center'>
          <section className='my-auto'>
            <ShoppingCartIcon sx={{ fontSize: 50 }} />
          </section>

          <section className='w-full text-xs md:text-sm lg:text-base font-semibold pl-2 md:pl-4 border-black text-gray-600' >
            <div className='flex justify-between'>
              <p>Numero de productos:</p>
              <p> {props.numeroProductos} </p>  
            </div>
            <div className='flex justify-between'>
              <p>Coste total:</p>
              <p className='text-green-500'> {showCurrency(props.total)} </p>
            </div>
            <div className='flex justify-between border-b-2 border-gray-700'>
              <p>Descuento:</p>
              <p className='text-red-500'> {`- ${showCurrency(0)}`} </p>
            </div>
            <div className='flex justify-between'>
              <p>Coste final:</p>
              <p> {showCurrency(props.total)} </p>
            </div>
          </section>
        </section>

        <section className='flex justify-end w-full flex-row md:flex-col md:w-1/3 gap-2'>
          <button className='flex justify-center bg-blue-400 gap-1 text-white px-9 md:px-2 py-1 rounded-lg text-platinium hover:shadow-xl hover:scale-105' >
            <SwitchAccountIcon sx={{ fontSize: 35 }}/>
            Registro
          </button>
          <button className='flex justify-center bg-blue-400 gap-1 text-white px-11 md:px-2 py-1 rounded-lg text-platinium hover:shadow-xl hover:scale-105' >
            <ReceiptIcon sx={{ fontSize: 35 }}/>
            Factura
          </button>
        </section>

      </div>

    </section>
  );
}
