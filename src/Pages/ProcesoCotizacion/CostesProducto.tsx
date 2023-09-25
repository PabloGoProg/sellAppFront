import { Producto } from "../../Definitions/Interfaces/Producto";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CostesProducto(props: { produto: Producto }): JSX.Element {
  
  const showCurrency = (value: number): string => {
    return value.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
  }

  const precioTotal = (props.produto.precio * props.produto.cantidad) - (props.produto.descuento * props.produto.cantidad)

  return (
    <section className="flex">
      <section className='my-auto'>
        <ShoppingCartIcon sx={{ fontSize: 50 }} />
      </section>

      <section className='w-full text-xs md:text-sm lg:text-base font-normal pl-2 md:pl-4 border-black text-gray-600' >
        <div className='flex justify-between'>
          <p>Coste del producto: </p>
          <p className="text-green-600"> {`${showCurrency(props.produto.precio)} x ( ${props.produto.cantidad} )`} </p>
        </div>
        {
          props.produto.cantidad > 1 ? (
            <div className='flex justify-end'>
              <p className="text-green-600"> {`${showCurrency(props.produto.precio * props.produto.cantidad)}`} </p>
            </div>
          ) : (
            <div className='flex justify-end'>
              <p className="text-green-600"> {`${showCurrency(props.produto.precio)}`} </p>
            </div>
          )
        }
        <div className='flex justify-between border-b-2 border-black'>
          <p>Descuento: </p>
          <p className='text-red-500'> {`${showCurrency(props.produto.descuento)}` } </p>
        </div>
        <div className='flex justify-between'>
          <p>Coste final:</p>
          <p> {showCurrency(precioTotal)} </p>
        </div>
      </section>
    </section>
  )
}