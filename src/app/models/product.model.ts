interface Producto {
  id: number;
  nombre: string;
  img: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  iva: number;
  stock: number;
  total: number;
}

interface ProductoDTO extends Omit<Producto, 'cantidad'> {}

interface GetProductoDTO {
  productos: ProductoDTO[]
}

interface CrearProductoDTO extends Omit<Producto, 'cantidad'|'id'|'total'> {}

export { Producto, ProductoDTO, GetProductoDTO, CrearProductoDTO }
