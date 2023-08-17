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
  medidas: { ancho: number, alto: number }
  componentes: Array<[ComponenteProducto, number]>
  partes: PartesVentana | {}
  aluminio: Aluminio | undefined
  vidrio: Vidrio | undefined

  constructor(medidas: { ancho: number, alto: number }, referencia: string) {
    super()
    this.precio = 0
    this.descuento = 0
    this.medidas = medidas
    this.refertenciaSeleccionada = referencia
    this.componentes = []
    this.partes = {}
    this.aluminio = undefined
    this.vidrio = undefined
  }

  calcularPrecio (referencia: string): number | string {
    let precio = 0
    this.componentes.forEach(componente => {
      precio += componente[0].getPrecioUnidad() * componente[1]
    })
    if (!this.referencias.has(referencia)) {
      return 'La referencia que busca no existe'
    }
    this.precio = precio
    return precio
  }

  getPrecio (): number {
    return this.precio
  }

  getMedidas (): { ancho: number, alto: number } {
    return this.medidas
  }

  getComponentes (): Array<[ComponenteProducto, number]> {
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
