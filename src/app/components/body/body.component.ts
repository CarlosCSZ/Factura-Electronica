import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Producto, ProductoDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  busqueda = '';
  filtrados!: string[];
  productos!: ProductoDTO[];
  item: Producto = {
    id: 0,
    nombre: 'No hay Producto',
    img: '',
    descripcion: 'No hay descripcion No hay descripcion',
    precio: 0,
    cantidad: 1,
    iva: 0,
    stock: 0,
    total: 0
  };
  compras: Producto[] = []
  number = 0;
  showCrearProducto = false;

  constructor(
    private storeService: StoreService,
    private apiService: ApiService,
    private mensaje: ToastrService,
  ) {
    this.compras = this.storeService.myShoppingCart;
  }
  ngOnInit(): void {
    this.actualizarListaProductos();
  }

  filtrarProducto() {
    this.filtrados = [];
    this.productos.filter((item) => {
      const nombre = item.nombre.toLowerCase();
      if(nombre.includes(this.busqueda)){
        this.filtrados.push(nombre)
      }
    });
  }

  presentarProd() {
    const articulo = this.productos.find((item) => item.nombre.toLowerCase() === this.busqueda.toLowerCase());

    if(articulo){
      this.item.id = articulo?.id;
      this.item.nombre = articulo?.nombre.toUpperCase();
      this.item.img = articulo?.img;
      this.item.descripcion = articulo?.descripcion;
      const precio = articulo?.precio;
      this.item.precio = precio;
      this.item.iva = articulo?.iva;
      this.item.stock = articulo?.stock;
      this.item.total = precio + (precio*this.item.iva/100);
    } else {
      this.mensaje.error('PRODUCTO NO REGISTRADO');
      this.emptyItem();
    }
  }

  agregarNuevoProd() {
    this.showCrearProducto = true;
  }

  cerrarNuevoProd(mensajeModal: string) {
    if(mensajeModal === 'SUCCESS') {
      this.mensaje.success('PRODUCTO REGISTRADO CON EXITO');
    }
    if(mensajeModal === 'FAILED') {
      this.mensaje.error('PRODUCTO NO FUE REGISTRADO');
    }
    if(mensajeModal === 'INVALID') {
      this.mensaje.error('CAMPO/S DEL FORMULARIO INVALDIO/S');
    }
    this.showCrearProducto = false;
    this.actualizarListaProductos();
  }

  agregarProdCarrito() {
    let producto: Producto = {...this.item};
    const productoRepetido = this.compras.find((prod) => prod.id === producto.id);
    if(producto.nombre === 'No hay Producto') {
      this.mensaje.error('ACCION NO VALIDA');
    } else if (productoRepetido) {
      this.mensaje.error('PRODUCTO YA FUE AGREGADO');
    } else {
      this.storeService.addProduct(producto);
      this.number = this.compras.length;
      this.mensaje.success('PRODUCTO AGREGADO');
    }
  }

  emptyItem() {
    this.item.id = 0;
    this.item.nombre = 'No hay Producto';
    this.item.img = '';
    this.item.descripcion = 'No hay Descripcion';
    this.item.precio = 0;
    this.item.cantidad = 1;
    this.item.iva = 0;
    this.item.stock = 0;
    this.item.total = 0;
  }

  actualizarListaProductos() {
    this.apiService.TraerProductos()
    .subscribe((data) => {
      this.productos = data.productos;
    });
    this.number = this.compras.length;
  }
}
