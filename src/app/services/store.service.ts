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
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  rmProduct(i: number): Producto[] {
    this._myShoppingCart.splice(i, 1);
    this.myCart.next(this.myShoppingCart);
    return this._myShoppingCart;
  }
}
