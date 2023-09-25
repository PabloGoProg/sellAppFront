import { Referenciacion } from '../Interfaces/Referenciacion'

export class ComponenteProducto extends Referenciacion {
  nombre: string
  precioUnidad: number
  cantidad: number 

  constructor (props: {
    nombre: string
    precioUnidad: number
    referencia: string
    cantidad: number
  }) {
    super()
    this.nombre = props.nombre
    this.precioUnidad = props.precioUnidad
    this.refertenciaSeleccionada = props.referencia
    this.cantidad = props.cantidad
  }

  editarPrecioPorUnidad (precio: number): void {
    this.precioUnidad = precio
  }

  getPrecioUnidad (): number {
    return this.precioUnidad
  }

  getNombre (): string {
    return this.nombre
  }
}
