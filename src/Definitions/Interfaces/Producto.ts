import { Referenciacion } from './Referenciacion'
import { Aluminio } from '../Classes/Aluminio'
import { Vidrio } from '../Classes/Vidrio'
import type { ComponenteProducto } from '../Classes/ComponenteProducto'
import type { PartesVentana } from '../types'

/**
 * Representa de el modelo de un producto base de la aplicación
 */
export abstract class Producto extends Referenciacion {
  precio: number
  descuento: number
  cantidad: number
  medidas: { ancho: number, alto: number }
  componentes: ComponenteProducto[]
  partes: PartesVentana | {}
  aluminio?: Aluminio | undefined
  vidrio: Vidrio | undefined

  constructor(medidas: { ancho: number, alto: number }, referencia: string) {
    super()
    this.precio = 0
    this.cantidad = 1
    this.descuento = 0
    this.medidas = medidas
    this.refertenciaSeleccionada = referencia
    this.componentes = []
    this.partes = {}
    this.aluminio = undefined
    this.vidrio = undefined
  }

  abstract calcularCostoPartes(): void
  abstract llenarPartes(): void
  abstract calcularPrecioTotal(): void

  calcularCostoComponentes(): number {
    let suma = 0;
    this.componentes.forEach(componente => {
      suma += componente.cantidad * componente.precioUnidad;
    })
    return suma;
  }

  getPrecio (): number {
    return this.precio
  }

  getMedidas (): { ancho: number, alto: number } {
    return this.medidas
  }

  getComponentes (): ComponenteProducto[] {
    return this.componentes
  }

  getAluminio (): Aluminio | undefined {
    return this.aluminio
  }

  setAluminio (aluminio: Aluminio): void {
    this.aluminio = aluminio
  }

  getVidrio (): Vidrio | undefined {
    return this.vidrio
  }

  setVidrio (vidrio: Vidrio): void {
    this.vidrio = vidrio
  }

}
