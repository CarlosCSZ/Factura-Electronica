import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from 'src/app/models/cliente.model';
import { Factura } from 'src/app/models/factura.model';
import { Producto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{
  productos: Producto[] = [];
  cliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    celular: '',
    direccion: ''
  };
  total = 0;
  clienteForm!: FormGroup;
  showSuccessModal: boolean = false;
  factura!: Factura;
  formValidity: boolean = false;

  @ViewChild('modalContainer', { read: ViewContainerRef }) successModal!: ViewContainerRef;

  constructor(
    private storeService: StoreService,
    private apiService: ApiService,
    private mensaje: ToastrService,
    public form: FormBuilder,
  ) {
    this.clienteForm = this.form.group({
      nombre: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      celular: ['', [Validators.required, Validators.pattern(/^0[0-9]{9}$/), ]],
      ubicacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.clienteForm.valueChanges.subscribe((data) => {
      this.cliente.nombre = data.nombre;
      this.cliente.cedula = data.identificacion;
      this.cliente.celular = data.celular;
      this.cliente.direccion = data.ubicacion;
    });

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
    if(this.cliente.id === 0) {
      if(!this.clienteForm.valid) {
        this.mensaje.error('Llena primero los datos del cliente')
      } else {
        const { id, ...objCliente } = this.cliente;
        this.apiService.crearCliente(objCliente)
        .subscribe(
          (data) => {
            this.cliente.id = data.cliente.id;
            this.apiService.crearFactura(this.cliente.id, this.productos)
            .subscribe(
              (data) => {
                this.factura = data.factura;
                this.showSuccessModal = true;
              },
              (error) => {
              this.mensaje.error(`${error}`);
              }
            )
          },
          (error) => {
            this.mensaje.error('INTENTALO DE NUEVO MAS TARDE');
          }
        )
      }

    } else {
      if(!this.formValidity) {
        this.mensaje.error('Llena manualmente los campos')
      } else {
        this.apiService.crearFactura(this.cliente.id, this.productos)
        .subscribe(
          (data) => {
            this.factura = data.factura;
            this.showSuccessModal = true;
          },
          (error) => {
          this.mensaje.error(`${error}`);
          }
        )
      }
    }
  }

  cerrarModal() {
    this.showSuccessModal = false;
  }

  actualizarTotal() {
    this.storeService.updateProducts(this.productos);
    this.total = this.storeService.getTotal();
  }

  buscarCliente() {
    const cedula = this.clienteForm.get('identificacion')?.value;
    if (!cedula) {
      return;
    }
    this.apiService.traerCLientePorCedula(cedula)
    .subscribe((data) => {
      this.cliente.id = data.clientes[0].id;
      this.cliente.nombre = data.clientes[0].nombre;
      this.cliente.cedula = data.clientes[0].cedula;
      this.cliente.celular = data.clientes[0].celular;
      this.cliente.direccion = data.clientes[0].direccion;
      this.mensaje.success('Cliente encontrado');
      this.clienteForm.patchValue({
        nombre: data.clientes[0].nombre,
        identificacion: cedula,
        celular: data.clientes[0].celular,
        ubicacion: data.clientes[0].direccion
      });

      this.formValidity = this.clienteForm.valid;
      this.clienteForm.disable();
    },
    (error) => {
      this.mensaje.error(`${error.message.toUpperCase()}`);
      this.cliente = {
        id: 0,
        nombre: '',
        cedula: '',
        celular: '',
        direccion: ''
      };
      this.clienteForm.enable();
    });
  }


}
