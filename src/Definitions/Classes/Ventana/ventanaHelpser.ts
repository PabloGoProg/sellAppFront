import { PartesVentana } from "../../types";
import { LIMITE_PERDIDA_MATERIAL, DIMENSIONES_LAMINA_VIDRIO } from "../../../utils/constantes";
import { ComponenteProducto } from "../ComponenteProducto";
import { componenteRodachinas, componenteCierre } from "../../../utils/constantes";

const aluminio744 = {
  sillar: 74000,
  cabezal: 76000,
  jamba: 76000,
  enganche: 83000,
  traslape: 74000,
  horizontalSuperior: 60000,
  horizontalInferior: 90000,
  sillarAlfajia: 140000,
}

const aluminio5020 = {
  sillar: 64000,
  cabezal: 60000,
  jamba: 57000,
  enganche: 51000,
  traslape: 37000,
  horizontal: 60000,
  sillarAlfajia: 122000,
}

const aluminio8025 = {
  sillar: 162000,
  cabezal: 160000,
  jamba: 140000,
  enganche: 115000,
  traslape: 114000,
  horizontalSuperior: 101000,
  horizontalInferior: 136000,
  sillarAlfajia: 140000,
}

const precioParte = (medida: number, precioEstandar: number): number => {
  if(medida <= 6) return medida * (precioEstandar/6);
  let laminas = Math.floor(medida / 6);
  return laminas * precioEstandar + (medida % 6) * precioEstandar / 6;
}

export const calcularPartes744 = (partes: PartesVentana, exterior: boolean, numeroCuerpos: number): number => {
  let costoTotal = 0;
  const costos = aluminio744;

  costoTotal += precioParte(partes.horizontalSuperior as number, costos.horizontalSuperior);
  costoTotal += precioParte(partes.horizontalInferior as number, costos.horizontalInferior);
  costoTotal += precioParte(partes.traslape, costos.traslape);
  costoTotal += precioParte(partes.cabezal, costos.cabezal);
  costoTotal += precioParte(partes.jamba, costos.jamba);

  if(numeroCuerpos > 1) costoTotal += precioParte(partes.enganche as number, costos.enganche);
  exterior 
    ? costoTotal += precioParte(partes.sillarAlfajia as number, costos.sillarAlfajia) 
    : costoTotal += precioParte(partes.sillar as number, costos.sillar);

  return costoTotal;
}

export const calcularPartes8025 = (partes: PartesVentana, exterior: boolean, numeroCuerpos: number): number => {
  let costoTotal = 0;
  const costos = aluminio8025;

  costoTotal += precioParte(partes.horizontalSuperior as number, costos.horizontalSuperior);
  costoTotal += precioParte(partes.horizontalInferior as number, costos.horizontalInferior);
  costoTotal += precioParte(partes.traslape, costos.traslape);
  costoTotal += precioParte(partes.cabezal, costos.cabezal);
  costoTotal += precioParte(partes.jamba, costos.jamba);

  if(numeroCuerpos > 1) costoTotal += precioParte(partes.enganche as number, costos.enganche);
  exterior 
    ? costoTotal += precioParte(partes.sillarAlfajia as number, costos.sillarAlfajia) 
    : costoTotal += precioParte(partes.sillar as number, costos.sillar);

  return costoTotal;
}

export const calcularPartes5020 = (partes: PartesVentana, exterior: boolean, numeroCuerpos: number): number => {
  let costoTotal = 0;
  const costos = aluminio5020;

  costoTotal += precioParte(partes.horizontal as number, costos.horizontal);
  costoTotal += precioParte(partes.traslape, costos.traslape);
  costoTotal += precioParte(partes.cabezal, costos.cabezal);
  costoTotal += precioParte(partes.jamba, costos.jamba);

  if(numeroCuerpos > 1) costoTotal += precioParte(partes.enganche as number, costos.enganche);
  exterior 
    ? costoTotal += precioParte(partes.sillarAlfajia as number, costos.sillarAlfajia) 
    : costoTotal += precioParte(partes.sillar as number, costos.sillar);

  return costoTotal;
}

const calcularMedidasPorNave = (medidas: { ancho: number, alto: number }, nCuerpos: number ): number => {
  let medidaAjustada = medidas.ancho / nCuerpos;

  if( Number(medidaAjustada.toFixed(1)) < medidaAjustada) return Number(medidaAjustada.toFixed(1)) + 0.1;
  else return Number(medidaAjustada.toFixed(1));
}

const validarPerdidaVidirio = (medidas: { ancho: number, alto: number } ): { ancho: number, alto: number } => {
  if(medidas.alto > DIMENSIONES_LAMINA_VIDRIO.ALTO && medidas.ancho <= DIMENSIONES_LAMINA_VIDRIO.ANCHO) {
    if(medidas.alto > DIMENSIONES_LAMINA_VIDRIO.ANCHO - LIMITE_PERDIDA_MATERIAL) medidas.alto = DIMENSIONES_LAMINA_VIDRIO.ANCHO;
    if(medidas.ancho > DIMENSIONES_LAMINA_VIDRIO.ALTO - LIMITE_PERDIDA_MATERIAL) medidas.ancho = DIMENSIONES_LAMINA_VIDRIO.ALTO;
  } else {
    if(medidas.alto > DIMENSIONES_LAMINA_VIDRIO.ALTO - LIMITE_PERDIDA_MATERIAL) medidas.alto = DIMENSIONES_LAMINA_VIDRIO.ALTO;
    if(medidas.ancho > DIMENSIONES_LAMINA_VIDRIO.ANCHO - LIMITE_PERDIDA_MATERIAL) medidas.ancho = DIMENSIONES_LAMINA_VIDRIO.ANCHO;
  }
  return medidas;
}

export const calcularDimensionesVidrio = ( medidas: { ancho: number, alto: number }, nCuerpos: number ): number => {
  let medidasAjustadas = {
    ancho: calcularMedidasPorNave(medidas, nCuerpos),
    alto: medidas.alto
  }

  medidasAjustadas = validarPerdidaVidirio(medidasAjustadas);

  return Number((medidasAjustadas.ancho * medidasAjustadas.alto).toFixed(1)) * nCuerpos;
}

export const colocarComponentes = (referencia: string, nCuerpos: number, lista: ComponenteProducto[]) => {
  if(referencia && lista.length === 0) {
    if(nCuerpos > 1) {
      lista.push(new ComponenteProducto({
        nombre: 'Rodachina',
        precioUnidad: componenteRodachinas.find(rodachina => rodachina.nombre === referencia)?.precio as number,
        referencia: referencia,
        cantidad: 4
      }))
    }
  }
}
1