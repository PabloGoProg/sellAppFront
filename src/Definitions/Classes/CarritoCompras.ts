import type { Empleado } from './Empleado'
import { Producto } from '../Interfaces/Producto'
import { CalculoAluminio } from './CalculoAluminio'
import { Usuario } from './Usuario'

/**
 * Representa el modelo de un carrito de compras dentro de la aplicación
 * Este carrito de compras tiene la necesidad de suplir un conjunto de productos que determinado cliente desee comprar. Aquí se cálculara el precio neto de la compra y se tendrá la posibilidad de establecer un descuento por parte del vendedor quien realiza la venta.
 */
export class CarritoCompras {
  precioNeto: number
  descuento: number
  precioTotal: number
  listaProductos: Producto[]
  aluminioTotal: Map<string, number> | undefined
  datosComprador: Usuario
  empleadoRealizador: Empleado

  constructor(realizador: Empleado, cliente: Usuario) {
    this.precioNeto = 0
    this.descuento = 0
    this.precioTotal = 0
    this.listaProductos = []
    this.datosComprador = cliente
    this.aluminioTotal = undefined
    this.empleadoRealizador = realizador
  }

  calcularMateriales(): void {
    const manejador = new CalculoAluminio();
    const medidasMateriales =  manejador.sumatoriaAluminio(this.listaProductos);

    this.aluminioTotal = medidasMateriales[0];
  }

  calcularPrecioNeto(): void {
    let precioNeto = 0
    this.listaProductos.forEach(producto => {
      precioNeto += producto.getPrecio()
    })
    this.precioNeto = precioNeto
  }

  calcularPrecioTotal(): void {
    if (this.descuento <= 1) {
      this.precioTotal = this.precioNeto - (this.precioNeto * this.descuento)
    } else if (this.descuento > 1 && this.descuento <= this.precioNeto) {
      this.precioTotal = this.precioNeto - this.descuento
    } else {
      this.precioTotal = this.precioNeto
    }
  }

  public agregarProducto(producto: Producto): void {
    this.listaProductos.push(producto)
  }

  eliminarProducto(producto: Producto | number): void {
    if (producto instanceof Producto) {
      this.listaProductos = this.listaProductos.filter(prod => prod !== producto)
    } else {
      this.listaProductos.splice(producto, 1)
    }
  }

  editarProducto(index: number, producto: Producto): void {
    this.listaProductos[index] = producto
  }

  setDescuento(descuento: number): void {
    this.descuento = descuento
  }

  getDescuento(): number {
    return this.descuento
  }

  gtePrecioNeto(): number {
    return this.precioNeto
  }

  getPrecioTotal(): number {
    return this.precioTotal
  }

  getListaProductos(): Producto[] {
    return this.listaProductos
  }

  getCliente(): Usuario | undefined {
    if (this.datosComprador instanceof Usuario) return this.datosComprador 
    return undefined
  }

  getRealizador(): Empleado {
    return this.empleadoRealizador
  }
}
