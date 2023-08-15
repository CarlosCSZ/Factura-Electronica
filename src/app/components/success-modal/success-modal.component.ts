import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Factura } from 'src/app/models/factura.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() factura!: Factura;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  irInicio() {
    this.router.navigate(['home']);
  }

  async imprimirFactura() {
    try {
      if (!this.factura) {
        return;
      }

      const pdfResponse = <any>await this.apiService.imprimirFactura(this.factura.id);
      const pdfData = pdfResponse.pdfBuffer.data;
      const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = pdfResponse.filename;
      link.click();
      link.remove();

      window.focus();
      await this.cambiodeFocus();
      this.router.navigate(['home']);

    } catch (error) {
      console.error('Error al imprimir la factura:', error);
    }
  }

  private async cambiodeFocus() {
    return new Promise<void>((resolve) => {
      const onFocusChange = () => {
        window.removeEventListener('focus', onFocusChange);
        resolve();
      };
      window.addEventListener('focus', onFocusChange);
    });
  }
}
