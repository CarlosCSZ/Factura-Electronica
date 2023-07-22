import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
}
