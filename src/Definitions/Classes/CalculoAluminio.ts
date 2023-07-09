import { Producto } from "../Interfaces/Producto"
import { Aluminio } from "./Aluminio";

export class CalculoAluminio {

  constructor() {
  }

  sumatoriaAluminio(productos: Producto[]): number {

    const productosSeparados = this.separarTiposProducto(productos);
    const sumatoriaTotal = new Map<string, number>();

    productosSeparados.forEach(listadoTipo => {

      const listadoTipo_Material = this.separarTipoAluminio(listadoTipo);

      listadoTipo_Material.forEach(listadoAluminio => {

        // FUncion de sumatoria de aluminio según el tipo de producto y refrenciacia de aluminio

      })

    })

    return 1;

  }

  separarTipoAluminio(productos: Producto[]): Producto[][] {
    const separacionReferencias: Producto[][] = [];
    const referenciasUsadas = new Map<string, number>();

    productos.forEach(p => {
      if(p.aluminio instanceof Aluminio) this.determinarConjunto(separacionReferencias, p, referenciasUsadas, p.aluminio.refertenciaSeleccionada as string);
    })

    return separacionReferencias;
  }

  separarTiposProducto(productos: Producto[]): Producto[][] {
    const tipos: Producto[][] = [];
    const tiposUsados = new Map<string, number>();

    productos.forEach(p => {
      this.determinarConjunto(tipos, p, tiposUsados, p.constructor.name);
    })

    return tipos;
  }

  determinarConjunto(listaConjuntos: Producto[][], p: Producto, tiposUsados: Map<string, number>, target: string): void {
    if(tiposUsados.has(target)) listaConjuntos[tiposUsados.get(target) as number].push(p);
    else {
      tiposUsados.set(target, listaConjuntos.length);
      listaConjuntos.push([p]);
    }
  }

}