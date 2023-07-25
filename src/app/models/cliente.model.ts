interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  celular: string;
  direccion: string;
}

interface GetClienteDTO {
  clientes: Cliente[];
}

interface CrearClienteDTO extends Omit<Cliente, 'id'> {}

interface NuevoClienteDTO {
  cliente: Cliente;
}

export { Cliente, GetClienteDTO, CrearClienteDTO, NuevoClienteDTO };
