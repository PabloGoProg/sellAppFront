import { Material } from '../Interfaces/Material'

/**
 * @class Aluminio --> El aluminio se mide en barras mínimas de 6 metros de longitud
 * Adicionalmente, este se cobra por metro, pero es necesario tener en cuenta el tamaño de la barra para contar con el desperdicio de material
 */

export class Aluminio extends Material {
  constructor (precio: number) {
    super(precio);
  }
}
