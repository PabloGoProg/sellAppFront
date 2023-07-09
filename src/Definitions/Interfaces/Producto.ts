import { Referenciacion } from './Referenciacion'
import { Aluminio } from '../Classes/Aluminio'
import { Vidrio } from '../Classes/Vidrio'
import type { ComponenteProducto } from '../Classes/ComponenteProducto'
import type { Medidas } from '../types'

/**
 * Representa de el modelo de un producto base de la aplicación
 */
export abstract class Producto extends Referenciacion {
  precio: number
  medidas: { ancho: number, alto: number }
  componentes: Array<[ComponenteProducto, number]>
  aluminio: Aluminio | undefined
  vidirio: Vidrio | undefined

  constructor (base: Medidas) {
    super()
    this.precio = 0
    this.medidas = base
    this.componentes = []
    this.aluminio = undefined
    this.vidirio = undefined
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
    return this.vidirio
  }

  setVidrio (vidrio: Vidrio): void {
    this.vidirio = vidrio
  }

}
