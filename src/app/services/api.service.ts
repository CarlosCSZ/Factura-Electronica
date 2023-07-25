import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CrearProductoDTO, GetProductoDTO } from '../models/product.model';
import { Cliente, CrearClienteDTO, GetClienteDTO, NuevoClienteDTO } from '../models/cliente.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  TraerProductos() {
    return this.http.get<GetProductoDTO>('http://localhost:3000/api/productos');
  }

  crearProducto(producto: CrearProductoDTO) {
    const nuevoProducto = this.http.post<GetProductoDTO>('http://localhost:3000/api/productos', producto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError( () => new Error('Algo esta fallando en el servidor'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError( () => new Error('El cliente no existe'));
        }
        if (error.status === HttpStatusCode.Forbidden) {
          return throwError( () => new Error('Campo de identificacion Vacio'));
        }
        return throwError( () => new Error('Ups algo salio mal'));
      })
    );

    return nuevoProducto
  }

  traerCLientePorCedula(cedula: string) {
    const cliente = this.http.get<GetClienteDTO>(`http://localhost:3000/api/clientes?cedula=${cedula}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError( () => new Error('Algo esta fallando en el servidor'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError( () => new Error('El cliente no existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError( () => new Error('No estas permitido'));
        }
        if (error.status === HttpStatusCode.Forbidden) {
          return throwError( () => new Error('Campo de identificacion Vacio'));
        }
        return throwError( () => new Error('Ups algo salio mal'));
      })
    );

    return cliente
  }

  crearCliente(cliente: CrearClienteDTO) {
    const nuevoCliente = this.http.post<NuevoClienteDTO>('http://localhost:3000/api/clientes', cliente)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError( () => new Error('Algo esta fallando en el servidor'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError( () => new Error('El cliente no existe'));
        }
        if (error.status === HttpStatusCode.Forbidden) {
          return throwError( () => new Error('Campo/s de cliente invalido/s'));
        }
        return throwError( () => new Error('Ups algo salio mal'));
      })
    );

    return nuevoCliente
  }

}
