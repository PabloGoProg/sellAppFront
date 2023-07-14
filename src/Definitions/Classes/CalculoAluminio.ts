import { Producto } from '../Interfaces/Producto'
import { Aluminio } from './Aluminio'
import { constantePerdida } from '../constantes'

export class CalculoAluminio {

  constructor() {
  }

  sumatoriaAluminio(productos: Producto[]): Map<string, number> {

    // Separa los productos segu4n su categoría (Puerta, Ventana, etc.)
    const productosSeparados = this.separarTiposProducto(productos);
    const sumatoriaTotal = new Map<string, number>();

    productosSeparados.forEach(listadoTipo => {

      // Separa el listado de un  tipo de producto según su referencia de aluminio
      const listadoTipo_Material = this.separarTipoAluminio(listadoTipo);

      listadoTipo_Material.forEach(listadoAluminio => {

        // Suma las medidas de aluminio de cada producto
        const suma = this.sumaPartes(listadoAluminio);
        // Toma la referenica de aluminio del primer producto del listado
        const referencia = listadoAluminio[0].aluminio?.refertenciaSeleccionada as string;

        if(sumatoriaTotal.has(referencia)) sumatoriaTotal.set(referencia, sumatoriaTotal.get(referencia) as number + suma);
        else sumatoriaTotal.set(referencia, suma);
        
      })

    })

    return sumatoriaTotal;
  }

  sumaPartes(productos: Producto[]): number {
    const suma = new Map<string, number>();

    productos.forEach(p => {
      const nombresPartes = Object.keys(p.partes);
      nombresPartes.forEach(key => {
        if(suma.has(key)) suma.set(key, suma.get(key) as number + p.partes[key as keyof typeof p.partes]);
        else suma.set(key, p.partes[key as keyof typeof p.partes]);
      })
    })

    return this.validarPerdidaMaterial(suma);
  }

  /**
   * Valida que las sumas de medidas para cada parte de un conjunto de produtos se reflejen en medidas apropiadas para el corte de aluminio
   * @param partes Un mapa que tiene el listado de partes de un segmento de productos junto a la suma de sus medidas
   * @returns 
   */
  validarPerdidaMaterial(partes: Map<string, number>): number {
    let sumaTotal = 0;

    partes.forEach((value, key) => {
      const valorAproximado = Number(value.toFixed(0));
      if(value < valorAproximado && value >= valorAproximado - constantePerdida) partes.set(key, valorAproximado);
      else if(valorAproximado < value && Math.round(((value - valorAproximado)) * 100) / 100 >= 0.2) partes.set(key, (valorAproximado + 0.5)); 
      sumaTotal += partes.get(key) as number;
    })

    return sumaTotal;
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