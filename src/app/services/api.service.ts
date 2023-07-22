import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { GetProductoDTO, Producto } from '../models/product.model';

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

}
