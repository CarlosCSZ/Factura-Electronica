import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { GetProductoDTO, Producto } from '../models/product.model';
import { GetClienteDTO } from '../models/cliente.model';
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

  crearProducto(producto: Producto) {

  }

  traerCLientePorCedula(cedula: string) {
    const cliente = this.http.get<GetClienteDTO>(`http://localhost:3000/api/clientes?cedula=${cedula}`);
    return cliente
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
    )
  }

}
