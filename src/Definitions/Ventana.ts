 import type { PartesVentana, PropiedadesVentana } from './types'
import { Producto } from './Producto'

export class Ventana extends Producto {
  numeroCuerpos: number
  exterior: boolean
  partesVentana: PartesVentana

  constructor(props: PropiedadesVentana) {
    super(props.propsSuper)
    this.numeroCuerpos = props.numeroCuerpos
    this.exterior = props.exterior
    this.partesVentana = props.partesVentana
  }
}