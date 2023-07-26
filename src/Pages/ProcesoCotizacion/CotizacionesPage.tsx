import VentanaDesplegable from "../../Components/VentanaDesplegable";
import { useCarrito } from "../../Hooks/Carritos";
import FormularioComprador from "./FormularioComprador";
import AddIcon from '@mui/icons-material/Add'

export function CotizacionesPage() {
  const { carrito } = useCarrito();

  return (
    <section className="w-full my-4">
      {/* Primera sección: Datos del usuario y tipo de contacto */}
      <section className="w-full">
        <VentanaDesplegable 
        titular="Sección 1 - Datos del comprador y contacto"
        contenido={ <FormularioComprador /> }/>
      </section>

      <section className="flex justify-center rounded-xl py-2 bg-indigo_dye mx-[2.5%] my-4 text-platinium hover:shadow-2xl hover:bg-cerulean hover:transition-all">
        <button className="flex justify-center w-full text-center">
          <AddIcon />
          <p>Agregar nuevo producto</p>
        </button>
      </section>

    </section>
  );
}