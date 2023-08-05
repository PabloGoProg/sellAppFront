import type { informacionPersonal } from '../types'

export class Usuario {
  informacionPersonal: informacionPersonal

  constructor (informacionPersonal: informacionPersonal) {
    this.informacionPersonal = informacionPersonal
  }

  getInformacionPersonal (): informacionPersonal {
    return this.informacionPersonal
  }

  setInformacionPersonal (informacionPersonal: informacionPersonal): void {
    this.informacionPersonal = informacionPersonal
  }
}
