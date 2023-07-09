import { Persona } from '../Interfaces/Persona'
import type { informacionPersonal } from '../types'

export class Cliente extends Persona {
  constructor(props: informacionPersonal) {
    super(props)
  }

  actualizarInformacionPersonal (props: informacionPersonal): void {
    this.informacionPersonal = props
  }

  getInformacionPersonal (): informacionPersonal {
    return this.informacionPersonal
  }
}
