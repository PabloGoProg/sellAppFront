import { Producto } from "../../Definitions/Interfaces/Producto";

export default function RegistroProducto(props: { producto: Producto } ): JSX.Element {
  const partesProducto = Object.entries(props.producto.partes);

  return (
    <section>
      {
        partesProducto.map((parte, index) => {
          if(parte[1] != 0) {
            return (
              <div key={index} className="text-gray-500">
                <span> {`${parte[0]}: ${parte[1]} metros`} </span>
              </div>
            )
          }
        })
      }
    </section>
  )

}