import { Referenciacion } from './Referenciacion'

export abstract class Material extends Referenciacion {
  precio: number

  constructor (precio: number) {
    super() 
    this.precio = precio
  }

  setPrecio(precio: number): void {
    this.precio = precio
  }

  getPrecio(): number {
    return this.precio
  }
}
