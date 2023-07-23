import { Producto } from '../Interfaces/Producto'
import { Aluminio } from './Aluminio'
import { LIMITE_PERDIDA_MATERIAL, DIMENSIONES_LAMINA_VIDRIO } from '../constantes'
import { Vidrio } from './Vidrio';
import { Ventana } from './Ventana';

export class CalculoAluminio {

  constructor() {
  }

  sumatoriaAluminio(productos: Producto[]): [Map<string, number>, Map<string, number>] {

    // Separa los productos segu4n su categoría (Puerta, Ventana, etc.)
    const productosSeparados = this.separarTiposProducto(productos);
    const aluminioTotal = new Map<string, number>();
    const vidrioTotal = new Map<string, number>();

    productosSeparados.forEach(listadoTipo => {

      // Separa el listado de un  tipo de producto según su referencia de aluminio
      const listadoMaterial = this.separarTipoMaterial(listadoTipo);

      listadoMaterial[0].forEach(listadoAluminio => {
        // Suma las medidas de aluminio de cada producto
        const suma = this.sumaPartes(listadoAluminio);
        // Toma la referenica de aluminio del primer producto del listado
        const referencia = listadoAluminio[0].aluminio?.refertenciaSeleccionada as string;

        if( aluminioTotal.has(referencia)) aluminioTotal.set(referencia, aluminioTotal.get(referencia) as number + suma);
        else aluminioTotal.set(referencia, suma);
      })

      listadoMaterial[1].forEach(listadoVidrio => {

        const sumaVidrio = this.sumarVidrioTotal(listadoVidrio);
        const referencia = listadoVidrio[0].vidrio?.refertenciaSeleccionada as string;

        if( vidrioTotal.has(referencia)) vidrioTotal.set(referencia, vidrioTotal.get(referencia) as number + sumaVidrio);
        else vidrioTotal.set(referencia, sumaVidrio);
      })

    })

    return [aluminioTotal, vidrioTotal];
  }

  /**
   * Se encarga de sumar todas las partes de aluminio de un conjunto de productos de un tipo y aluminio determinados
   * @param productos
   * @returns El proceso de validación de perdida de material tras sumar las partes de aluminio
   */
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

  sumarVidrioTotal(productos: Producto[]): number {
    let suma = 0;

    if(productos[0] instanceof Ventana) suma = this.sumaVidrioVentana(productos as Ventana[])

    return suma;
  }

  sumaVidrioVentana(productos: Ventana[]): number {
    let suma = 0;

    const calcularMedidaCuerpo = (medidas: { ancho: number, alto: number }, nCuerpos: number ): number => {
      let medidaAjustada = medidas.ancho / nCuerpos;

      if( Number(medidaAjustada.toFixed(1)) < medidaAjustada) return Number(medidaAjustada.toFixed(1)) + 0.1;
      else return Number(medidaAjustada.toFixed(1));
    }

    productos.forEach(p => {
      let medidasAjustadas = {
        ancho: calcularMedidaCuerpo(p.medidas, p.numeroCuerpos),
        alto: p.medidas.alto
      }

      medidasAjustadas = this.validarPerdidaVidirio(medidasAjustadas);

      suma += Number((medidasAjustadas.ancho * medidasAjustadas.alto).toFixed(1)) * p.numeroCuerpos;

    })

    return suma;
  }

  validarPerdidaVidirio(medidas: { ancho: number, alto: number } ): { ancho: number, alto: number } {
    if(medidas.alto > DIMENSIONES_LAMINA_VIDRIO.ALTO && medidas.ancho <= DIMENSIONES_LAMINA_VIDRIO.ANCHO) {
      if(medidas.alto > DIMENSIONES_LAMINA_VIDRIO.ANCHO - LIMITE_PERDIDA_MATERIAL) medidas.alto = DIMENSIONES_LAMINA_VIDRIO.ANCHO;
      if(medidas.ancho > DIMENSIONES_LAMINA_VIDRIO.ALTO - LIMITE_PERDIDA_MATERIAL) medidas.ancho = DIMENSIONES_LAMINA_VIDRIO.ALTO;
    } else {
      if(medidas.alto > DIMENSIONES_LAMINA_VIDRIO.ALTO - LIMITE_PERDIDA_MATERIAL) medidas.alto = DIMENSIONES_LAMINA_VIDRIO.ALTO;
      if(medidas.ancho > DIMENSIONES_LAMINA_VIDRIO.ANCHO - LIMITE_PERDIDA_MATERIAL) medidas.ancho = DIMENSIONES_LAMINA_VIDRIO.ANCHO;
    }
    return medidas;
  }

  /**
   * Valida que las sumas de medidas para cada parte de un conjunto de produtos se reflejen en medidas apropiadas para el corte de aluminio
   * @param partes Un mapa que tiene el listado de partes de un segmento de productos junto a la suma de sus medidas
   * @returns la suma de aluminio de determinada referencia
   */
  validarPerdidaMaterial(partes: Map<string, number>): number {
    let sumaTotal = 0;

    partes.forEach((value, key) => {
      const valorAproximado = Number(value.toFixed(0));
      if(value < valorAproximado && value >= valorAproximado - LIMITE_PERDIDA_MATERIAL) partes.set(key, valorAproximado);
      else if(valorAproximado < value && Math.round(((value - valorAproximado)) * 100) / 100 >= 0.2) partes.set(key, (valorAproximado + 0.5)); 
      sumaTotal += partes.get(key) as number;
    })

    return sumaTotal;
  }
  
  /**
   * Sepata una lista de productos según las refrencias de vidrio y aluminio que tengan
   * @param productos una lista de productos ordenado segu4n su tipo
   * @returns una lista de dos posiciones, la primera es una lista con los conjuntos de aluminio y la segunda con los conjuntos de vidrio
   */
  separarTipoMaterial(productos: Producto[]): [Producto[][], Producto[][]] {
    const referenciasAluminio: Producto[][] = [];
    const referenciasVidrio: Producto[][] = [];
    const referenciasUsadas = new Map<string, number>();

    productos.forEach(p => {
      if(p.aluminio instanceof Aluminio) this.determinarConjunto(referenciasAluminio, p, referenciasUsadas, p.aluminio.refertenciaSeleccionada as string);
      if(p.vidrio instanceof Vidrio) this.determinarConjunto(referenciasVidrio, p, referenciasUsadas, p.vidrio.refertenciaSeleccionada as string);
    })

    return [referenciasAluminio, referenciasVidrio];
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