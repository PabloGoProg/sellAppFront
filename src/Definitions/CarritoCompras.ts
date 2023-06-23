import type { PropiedadesCarrito } from './types'
import type { Empleado } from './Empleado'
import { Producto } from './Producto'
import { Cliente } from './Cliente'

/**
 * Representa el modelo de un carrito de compras dentro de la aplicación
 * Este carrito de compras tiene la necesidad de suplir un conjunto de productos que determinado cliente desee comprar. Aquí se cálculara el precio neto de la compra y se tendrá la posibilidad de establecer un descuento por parte del vendedor quien realiza la venta.
 */
export class CarritoCompras {
  precioNeto: number
  descuento: number
  precioTotal: number
  listaProductos: Producto[]
  datosCompradopr: Cliente | undefined
  empleadoRealizador: Empleado

  constructor(props: PropiedadesCarrito) {
    this.precioNeto = 0
    this.descuento = 0
    this.precioTotal = 0
    this.listaProductos = []
    this.datosCompradopr = undefined
    this.empleadoRealizador = props.realizador
  }

  /**
   * Calcula el precio neto de la compra a través del listado de productos que se encuentran en el arreglo {listadoProductos}
   */
  calcularPrecioNeto(): void {
    let precioNeto = 0
    this.listaProductos.forEach(producto => {
      precioNeto += producto.getPrecio()
    })
    this.precioNeto = precioNeto
  }

  /**
   * Calcula el precio total de la compra a través del precio neto y el descuento que se le aplique
   * 1. SI el descuento es menor o igual a 1, se le aplicará un descuento porcentual
   * 2. SI el descuento es mayor a 1 y menor o igual al precio neto, se le aplicará un descuento en valor
   */
  calcularPrecioTotal(): void {
    if (this.descuento <= 1) {
      this.precioTotal = this.precioNeto - (this.precioNeto * this.descuento)
    } else if (this.descuento > 1 && this.descuento <= this.precioNeto) {
      this.precioTotal = this.precioNeto - this.descuento
    } else {
      this.precioTotal = this.precioNeto
    }
  }

  /**
   * Agrega un producto al array {listadoProductos}
   * @param producto el Producto que se desea agregar al array
   */
  agregarProducto(producto: Producto): void {
    this.listaProductos.push(producto)
  }

  /**
   * Busca eliminar un producto mediante su referencia cómo objeto
   * @param producto Producto que se desea eliminar
   */
  eliminarProducto(producto: Producto | number): void {
    if (producto instanceof Producto) {
      this.listaProductos = this.listaProductos.filter(prod => prod !== producto)
    } else {
      this.listaProductos.splice(producto, 1)
    }
  }

  /**
   * Busca editar un producto del array mediante su indice en la lista
   * @param index El indice del producto que se desea editar
   * @param producto El producto que reemplazara el valor en el indice
   * Debe tenerse en cuenta que para editar un producto, este debe ser del mismo tipo que el que se encuentra en el array, de lo contrario no tendría sentido la edición.
   */
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

  getCliente(): Cliente | undefined {
    if (this.datosCompradopr instanceof Cliente) return this.datosCompradopr 
    return undefined
  }

  getRealizador(): Empleado {
    return this.empleadoRealizador
  }
}
