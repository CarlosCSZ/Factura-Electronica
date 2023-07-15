import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{
  productos: Producto[] = [];
  cantidad = 1;
  total = 0;
  closebtn = "./assets/svg/close.svg";

  constructor(
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((compras) => {
      this.productos = compras;
      this.total = this.storeService.getTotal();
    });
  }

  rmProduct(i: number) {
    this.productos = this.storeService.rmProduct(i);
    this.total = this.storeService.getTotal();
  }
}
