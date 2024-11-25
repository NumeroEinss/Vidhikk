import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrl: './qr-modal.component.scss'
})
export class QrModalComponent {

  @Input('qrData') qrData: any;
  @Output() paymentConfirmedEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  paymentConfirmed() {
    this.paymentConfirmedEvent.emit();
  }
}
