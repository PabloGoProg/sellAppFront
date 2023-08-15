import type { PartesVentana } from '../types'
import { Producto } from '../Interfaces/Producto'

export class Ventana extends Producto {
  numeroCuerpos: number
  exterior: boolean

  constructor(medidas: { ancho: number, alto: number }, referencia: string) {
    super(medidas, referencia)
    this.numeroCuerpos = 1
    this.exterior = false
    this.llenarPartesVentana()
  }

  llenarPartesVentana(): void {
    const creacionPartes: PartesVentana = {
      cabezal: this.medidas.ancho,
      jamba: this.medidas.alto * 2,
      traslape: this.medidas.alto * 2,
      horizontalSuperior: this.medidas.ancho,
      horizontalInferior: this.medidas.ancho
    }

    if(this.numeroCuerpos > 1) {
      if(this.numeroCuerpos === 2) creacionPartes.enganche = this.medidas.alto * 2;
      if(this.numeroCuerpos === 3) creacionPartes.enganche = this.medidas.alto * 4;
    }

    this.partes = creacionPartes
  }

  setNumeroCuerpos(numeroCuerpos: number): void {
    this.numeroCuerpos = numeroCuerpos;
    this.llenarPartesVentana();
  }

  getNumeroCuerpos(): number {
    return this.numeroCuerpos;
  }

  setExterior(exterior: boolean): void {
    this.exterior = exterior;
    let partesTemporal = this.partes as PartesVentana;
    if(this.exterior) {
      partesTemporal.sillarAlfajia = this.medidas.ancho
      partesTemporal.sillar = 0
    } else {
      partesTemporal.sillar = this.medidas.ancho
      partesTemporal.sillarAlfajia = 0
    }
    this.partes = partesTemporal;
  }

  getExterior(): boolean {
    return this.exterior;
  }

  getPartesVentana(): PartesVentana | {} {
    return this.partes;
  }
}