import { Referenciacion } from './Referenciacion'
import type { ComponenteProducto } from './ComponenteProducto'
import type { PropiedadesProducto } from './types'

/**
 * Representa de el modelo de un producto base de la aplicación
 */
export abstract class Producto extends Referenciacion {
  precio: number
  medidas: { ancho: number, alto: number }
  componentes: Array<[ComponenteProducto, number]>

  constructor (props: PropiedadesProducto) {
    super()
    this.precio = 0
    this.medidas = props.medidas
    this.componentes = []
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
}
