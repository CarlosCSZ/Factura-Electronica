import { Component, OnInit } from '@angular/core';

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
  cantidad = 1;
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

  constructor(
    private storeService: StoreService,
    private apiService: ApiService,
  ) {
    this.compras = this.storeService.myShoppingCart;
  }
  ngOnInit(): void {
    this.apiService.TraerProductos()
    .subscribe((data) => {
      this.productos = data.productos;
    });
    this.number = this.compras.length;
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
      this.item.cantidad = this.cantidad;
      this.item.stock = articulo?.stock;
      this.item.total = precio + (precio*this.item.iva/100);
    } else {
      this.emptyItem();
    }
  }

  agregarNuevoProd() {
    this.apiService.crearProducto(this.item)//.subscribe()
  }

  agregarProdCarrito() {
    let producto: Producto = {...this.item};
    const productoRepetido = this.compras.find((prod) => prod.id === producto.id);
    if(producto.nombre !== 'No hay Producto' && !productoRepetido) {
      this.storeService.addProduct(producto);
      this.number = this.compras.length;
    } else {
      alert('ACCION NO VALIDA || PRODUCTO YA REGISTRADO');
    }
    console.log('Carrito end: ', this.storeService.myShoppingCart.length, this.storeService.myShoppingCart)
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
}
