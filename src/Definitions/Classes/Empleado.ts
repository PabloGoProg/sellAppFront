import { Persona } from '../Interfaces/Persona'
import type { InformacionEmpleado } from '../types'

export class Empleado extends Persona {
  correoPrincipal: string
  telefonoPrincipal: string
  contrasena: string

  constructor (props: InformacionEmpleado) {
    super(props.infoPersonal)
    this.correoPrincipal = props.correoPrincipal
    this.telefonoPrincipal = props.telefonoPrincipal
    this.contrasena = props.contrasena
  }

  actualizarCorreoPrincipal (correo: string): void {
    this.correoPrincipal = correo
  }

  actualizarTelefonoPrincipal (telefono: string): void {
    this.telefonoPrincipal = telefono
  }

  actualizarContrasena (contrasena: string): void {
    this.contrasena = contrasena
  }

  getInformacionEmpleado (): InformacionEmpleado {
    return {
      infoPersonal: this.informacionPersonal,
      correoPrincipal: this.correoPrincipal,
      telefonoPrincipal: this.telefonoPrincipal,
      contrasena: this.contrasena
    }
  }
}
