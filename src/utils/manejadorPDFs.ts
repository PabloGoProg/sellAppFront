import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import { Producto } from "../Definitions/Interfaces/Producto";

/**
 {
  "precioNeto": 0,
  "descuento": 0,
  "precioTotal": 0,
  "listaProductos": [
    {
      "referencias": {},
      "refertenciaSeleccionada": "7:44",
      "precio": 0,
      "descuento": 0,
      "medidas": {
        "ancho": "2",
        "alto": "2"
      },
      "componentes": [],
      "partes": {
        "cabezal": "2",
        "jamba": 4,
        "traslape": 4,
        "horizontalSuperior": "2",
        "horizontalInferior": "2",
        "enganche": 4,
        "sillarAlfajia": "2",
        "sillar": 0
      },
      "numeroCuerpos": 2,
      "exterior": true
    }
  ],
  "datosComprador": {
    "informacionPersonal": {
      "nombre": "Mariana Hernandez"
    }
  },
  "empleadoRealizador": {
    "informacionPersonal": {
      "nombre": "Juan Perez"
    },
    "correoPrincipal": "juanperez@gmail.com",
    "telefonoPrincipal": "1234567890",
    "contrasena": "123456"
  }
}
 */

export function generarFactura(carrito: string) {
  const factura = new jsPDF();
  const obj = JSON.parse(carrito);

  const datosComprador = obj.datosComprador.informacionPersonal;
  const datosVendedor = obj.empleadoRealizador;

  facturaHeader(factura);

  autoTable(factura, {
    body: [
      [
        {
          content: 'Datos del comprador\n'
          + `\nNombre: ${datosComprador.nombre}`
          + `\nCorreo: `
          + `\nTelefono:`,
          styles: {
            halign: 'left',
            fontSize: 10,
            fontStyle: 'normal',
            fillColor: '#FFFFFF'
          }
        },
        {
          content: 'Responsable de venta\n'
          + `\nNombre: ${datosVendedor.informacionPersonal.nombre}`
          + `\nCorreo: ${datosVendedor.correoPrincipal}`
          + `\nnTelefono: ${datosVendedor.telefonoPrincipal}`,
          styles: {
            halign: 'left',
            fontSize: 10,
            fontStyle: 'normal',
            fillColor: '#FFFFFF'
          }
        }
      ]
    ]
  })

  autoTable(factura, {
    head: [['Producto', 'Referencia', 'Aluminio', 'Vidrio', 'Cantidad', 'Precio', 'Total']],
    body: productosFormateados(obj.listaProductos),
    theme: 'striped',
    headStyles: {
      fillColor: '#3366FF'
    }
  })

  return factura.output('dataurlnewwindow')

}

function productosFormateados(listaProductos: Producto[]): Array< Array< string | number > > {
  let ans: Array< Array< string | number > > = [];

  listaProductos.forEach(producto => {
    let temp: Array< string | number > = [];
    temp.push(producto.constructor.name);
    temp.push(producto.refertenciaSeleccionada as string);
    temp.push(producto.aluminio?.refertenciaSeleccionada as string);
    temp.push(producto.vidrio?.refertenciaSeleccionada as string);
    temp.push(1);
    temp.push(producto.precio);
    temp.push(producto.precio * 1);
    ans.push(temp);
  })

  return ans;
}


const facturaHeader = (factura: jsPDF) => {
  return autoTable(factura, {
    body: [
      [
        {
          content: 'Nombre de la empresa',
          styles: {
            halign: 'left',
            fontSize: 18,
            fontStyle:'bold',
            valign: 'middle',
            textColor: '#EEEEEE'
          }
        },
        {
          content: 'Factura',
          styles: {
            halign: 'right',
            fontSize: 18,
            fontStyle:'bold',
            valign: 'middle',
            textColor: '#EEEEEE'
          }
        }
      ],
    ],
    theme: 'plain',
    styles: {
      fillColor: '#3366FF'
    }
  });
}