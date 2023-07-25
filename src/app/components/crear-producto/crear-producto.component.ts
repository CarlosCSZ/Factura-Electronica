import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearProductoDTO } from 'src/app/models/product.model';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  @Output() closeModal: EventEmitter<string> = new EventEmitter<string>();
  productoForm!: FormGroup;
  producto: CrearProductoDTO = {
    nombre: '',
    img: '',
    descripcion: '',
    precio: 0,
    iva: 0,
    stock: 0
  }

  constructor(
    private apiService: ApiService,
    public form: FormBuilder,
  ) {
    this.productoForm = this.form.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      img: ['', [Validators.required, Validators.pattern(/\.(jpg|png|svg|webp)$/)]],
      precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      iva: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  agregarProducto() {
    let mensajeModal = '';
    if(this.productoForm.valid) {
      console.log('formulario valido');
      this.producto.nombre = this.productoForm.get('nombre')?.value.toLowerCase();
      this.producto.descripcion = this.productoForm.get('descripcion')?.value;
      this.producto.img = this.productoForm.get('img')?.value;
      this.producto.precio = this.productoForm.get('precio')?.value;
      this.producto.iva = this.productoForm.get('iva')?.value;
      this.producto.stock = this.productoForm.get('stock')?.value;
      console.log('objeto producto: ', this.producto);

      this.apiService.crearProducto(this.producto).subscribe(
        () => {
        mensajeModal = 'SUCCESS';
        this.productoForm.reset();
        this.closeModal.emit(mensajeModal);
        },
        (error) => {
          console.log('FAILED: ', error)
          mensajeModal = 'FAILED';
          this.productoForm.reset();
          this.closeModal.emit(mensajeModal);
        }
      );
    } else {
      mensajeModal = 'INVALID';
      this.productoForm.reset();
      this.closeModal.emit(mensajeModal);
    }
  }
}
