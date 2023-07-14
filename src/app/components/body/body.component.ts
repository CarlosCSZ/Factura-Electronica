import { Component } from '@angular/core';

import { Producto } from 'src/app/models/product.model';
import { BaseProductos } from '../../utils/productos';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  busqueda = '';
  productos: Producto[] = BaseProductos;
  item: Producto = {
    name: 'No hay Producto',
    img: '',
    description:
      'No hay descripcion No hay descripcion',
    price: '00',
  };
  compras: Producto[] = []
  number = 0;

  constructor(
    private storeService: StoreService,
  ) {
    this.compras = this.storeService.getShoppingCart();
  }

  presentarProd() {
    const articulo = this.productos.find((item) => item.name.toLowerCase() === this.busqueda.toLowerCase());

    if(articulo){
      this.item.name = articulo?.name;
      this.item.img = articulo?.img;
      this.item.description = articulo?.description;
      this.item.price = articulo?.price;
    } else {
      this.item.name = 'No hay Producto';
      this.item.img = '',
      this.item.description = 'No hay descripcion';
      this.item.price = 'oo';
    }
  }

  agregarProd() {
    if(this.item.name !== 'No hay Producto') {
      this.storeService.addProduct(this.item);
      this.number = this.compras.length;
    }
  }
}
