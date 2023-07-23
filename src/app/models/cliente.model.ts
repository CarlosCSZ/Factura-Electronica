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

export { Cliente, GetClienteDTO }
