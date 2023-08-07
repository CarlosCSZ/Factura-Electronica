interface Factura {
  id: number;
  clienteId: number;
  total: number;
}

interface GetFacturaDTO {
  factura: Factura
}

interface CrearFacturaDTO {
  clienteId: number;
  productos: number[];
  cantidad: number[];
}

export { Factura, GetFacturaDTO, CrearFacturaDTO }

