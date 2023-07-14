import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Producto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _myShoppingCart: Producto[] = [];
  private myCart = new BehaviorSubject<Producto[]>([]);

  myCart$ = this.myCart.asObservable();

  get myShoppingCart() {
    return this._myShoppingCart;
  }

  addProduct(product: Producto) {
    this._myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this._myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + parseInt(item.price), 0);
  }
}
