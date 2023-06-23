export abstract class Referenciacion {
  referencias = new Map<string, number>()
  refertenciaSeleccionada: string = ''

  agregarReferencia (referencia: { nombre: string, precio: number }): string {
    if (this.referencias.has(referencia.nombre)) {
      return 'La referencia que intenta agregar ya existe'
    }
    this.referencias.set(referencia.nombre, referencia.precio)
    return referencia.nombre
  }

  eliminarReferencia (referencia: { nombre: string, precio: number }): string {
    if (this.referencias.has(referencia.nombre)) {
      this.referencias.delete(referencia.nombre)
      return referencia.nombre
    } else {
      return 'La referencia que intenta eliminar no existe'
    }
  }

  editarReferencia (referencia: { nombre: string, precio: number }, nuevaReferencia: { nombre: string, precio: number }): string {
    if (this.referencias.has(nuevaReferencia.nombre)) {
      this.referencias.delete(referencia.nombre)
      this.referencias.set(nuevaReferencia.nombre, nuevaReferencia.precio)
    } else {
      return 'La referencia que intenta editar no existe'
    }
    return nuevaReferencia.nombre
  }
}
