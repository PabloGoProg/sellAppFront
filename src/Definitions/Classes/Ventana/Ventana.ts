import type { PartesVentana } from '../../types'
import { Producto } from '../../Interfaces/Producto'
import { calcularDimensionesVidrio, calcularPartes5020, calcularPartes744, calcularPartes8025, colocarComponentes } from './ventanaHelpser'
import { Vidrio } from '../Vidrio'
import { ComponenteProducto } from '../ComponenteProducto'

export class Ventana extends Producto {
  numeroCuerpos: number
  exterior: boolean

  constructor(medidas: { ancho: number, alto: number }, referencia: string) {
    super(medidas, referencia)
    this.numeroCuerpos = 1
    this.exterior = false
    this.llenarPartes()
    this.setExterior(this.exterior);
  }

  añadirComponentes(componente: ComponenteProducto, nombre: string) {
    if(!this.componentes.map(componente => componente.nombre).includes(nombre)) {
      this.componentes.push(componente);
    }
  }

  llenarPartes(): void {

    let creacionPartes = this.crearPartseSegunReferencia() as PartesVentana;
  
    if(this.numeroCuerpos > 1) {
      if(this.numeroCuerpos === 2) creacionPartes.enganche = this.medidas.alto * 2;
      if(this.numeroCuerpos === 3) creacionPartes.enganche = this.medidas.alto * 4;
    }

    if(this.exterior) {
      creacionPartes.sillarAlfajia = this.medidas.ancho
      creacionPartes.sillar = 0
    } else {
      creacionPartes.sillar = this.medidas.ancho
      creacionPartes.sillarAlfajia = 0
    }

    this.partes = creacionPartes;
    this.calcularPrecioTotal();
  }

  crearPartseSegunReferencia(): PartesVentana | void {
    if(this.refertenciaSeleccionada === '7:44') return {
      cabezal: this.medidas.ancho,
      jamba: this.medidas.alto * 2,
      traslape: this.medidas.alto * 2,
      horizontalSuperior: this.medidas.ancho,
      horizontalInferior: this.medidas.ancho
    }
    else if(this.refertenciaSeleccionada === '80:25') return {
      cabezal: this.medidas.ancho,
      jamba: this.medidas.alto * 2,
      traslape: this.medidas.alto * 2,
      horizontalSuperior: this.medidas.ancho,
      horizontalInferior: this.medidas.ancho
    }
    else if(this.refertenciaSeleccionada === '50:20') return {
      cabezal: this.medidas.ancho,
      jamba: this.medidas.alto * 2,
      traslape: this.medidas.alto * 2,
      horizontal: this.medidas.ancho
    }
  }

  calcularCostoPartes(): number {
    if(this.refertenciaSeleccionada === '7:44') {
      return calcularPartes744(this.partes as PartesVentana, this.exterior, this.numeroCuerpos);
    } else if(this.refertenciaSeleccionada === '80:25') {
      return calcularPartes8025(this.partes as PartesVentana, this.exterior, this.numeroCuerpos);
    } else if (this.refertenciaSeleccionada === '50:20') {
      return calcularPartes5020(this.partes as PartesVentana, this.exterior, this.numeroCuerpos);
    }
    return 0;
  }

  calcularPrecioTotal(): void {
    let precioTotal = 0;

    precioTotal += this.calcularCostoPartes();
    if(this.vidrio) precioTotal +=  calcularDimensionesVidrio(this.medidas, this.numeroCuerpos) * (this.vidrio as Vidrio).precio;
    precioTotal += this.calcularCostoComponentes();

    this.precio = precioTotal;
  }

  setNumeroCuerpos(numeroCuerpos: number): void {
    console.log(1)
    this.numeroCuerpos = numeroCuerpos;
    this.llenarPartes();
    colocarComponentes(this.refertenciaSeleccionada as string, this.numeroCuerpos, this.componentes);
  }

  getNumeroCuerpos(): number {
    return this.numeroCuerpos;
  }

  setExterior(exterior: boolean): void {
    this.exterior = exterior;
    this.llenarPartes();
  }

  getExterior(): boolean {
    return this.exterior;
  }

  getPartesVentana(): PartesVentana | {} {
    return this.partes;
  }
}