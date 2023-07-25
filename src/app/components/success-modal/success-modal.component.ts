import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit{
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() cliente!: Cliente;

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    if(this.cliente.id === 0) {
      const { id, ...objCliente } = this.cliente;
      const nuevoCliente = this.apiService.crearCliente(objCliente)
      .subscribe(
        (data) => {
          this.cliente = data.cliente;
        },
        (error) => {

        }
      )
    }
  }
}
