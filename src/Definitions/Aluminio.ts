import { Material } from './Material'

/** 
 * @class Aluminio --> El aluminio es un material el cual mediremois su precio por metro longitudinal
 */

export class Aluminio extends Material {
  constructor(precio: number) {
    super(precio)
  }
}
