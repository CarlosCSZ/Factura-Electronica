import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{
  productos: Producto[] = [];
  total = 0;
  closebtn = "./assets/svg/close.svg";

  modalRef: NgbModalRef | undefined;
  @ViewChild('successModal') successModal: any;

  constructor(
    private storeService: StoreService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    console.log('Carrito on inti: ', this.storeService.myShoppingCart.length, this.storeService.myShoppingCart)
    this.storeService.myCart$.subscribe((compras) => {
      this.productos = compras;
      this.total = this.storeService.getTotal();
    });
  }

  rmProduct(i: number) {
    this.productos = this.storeService.rmProduct(i);
    this.total = this.storeService.getTotal();
  }

  comprarProducto() {
    this.modalRef = this.modalService.open(this.successModal,
      {
        centered: true,
        size: 'sm',
        backdropClass: 'none'
      }
    )
  }

  cerrarModal() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }

  actualizarTotal() {
    this.storeService.updateProducts(this.productos);
    this.total = this.storeService.getTotal();
  }
}
