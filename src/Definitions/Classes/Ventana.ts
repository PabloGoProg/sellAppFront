import type { PartesVentana, PropiedadesVentana } from '../types'
import { Producto } from '../Interfaces/Producto'

export class Ventana extends Producto {
  numeroCuerpos: number
  exterior: boolean
  partesVentana: PartesVentana | {}

  constructor(props: PropiedadesVentana) {
    super(props.super)
    this.numeroCuerpos = 0
    this.exterior = props.exterior
    this.partesVentana = {}
    this.llenarPartesVentana()
  }

  llenarPartesVentana(): void {
    const creacionPartes: PartesVentana = {
      cabezal: this.medidas.ancho,
      jamba: this.medidas.alto * 2,
      traslape: this.medidas.alto * 2,
      horizontales: {
        superior: this.medidas.ancho,
        inferior: this.medidas.ancho
      }
    }

    if(this.exterior) {
      creacionPartes.sillarAlfajia = this.medidas.ancho
    } else {
      creacionPartes.sillar = this.medidas.ancho
    }

    this.partesVentana = creacionPartes
  }

  setNumeroCuerpos(numeroCuerpos: number): void {
    this.numeroCuerpos = numeroCuerpos;
  }

  getNumeroCuerpos(): number {
    return this.numeroCuerpos;
  }

  setExterior(exterior: boolean): void {
    this.exterior = exterior;
  }

  getExterior(): boolean {
    return this.exterior;
  }

  getPartesVentana(): PartesVentana | {} { 
    return this.partesVentana;
  }
}