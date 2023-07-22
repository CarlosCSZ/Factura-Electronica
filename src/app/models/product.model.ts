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

export { Producto, ProductoDTO, GetProductoDTO }
