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
  @Output() closeModal: EventEmitter<string> = new EventEmitter<string>();
  @Input() factura!: Factura;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  async irInicio() {
    await this.router.navigate(['']);
    window.location.reload();
  }

  async imprimirFactura() {
    try {
      if (!this.factura) {
        return;
      }

      const pdfResponse = <any>await this.apiService.imprimirFactura(this.factura.id);
      const pdfArrayBuffer = new Uint8Array(pdfResponse.pdfBuffer.data);
      const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = pdfResponse.filename;
      link.click();
      link.remove();

      window.focus();
      await this.cambiodeFocus();

      await this.router.navigate(['']);
      window.location.reload();

    } catch (error) {
      console.error('Error al imprimir la factura:', error);
      this.closeModal.emit("Paso un error al imprimir la factura. Intentelo mas tarde")
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
