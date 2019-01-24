import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './confirm-modal.component.html'
})
export class ModalConfirmComponent {
  @Input() messageToConfirm: string;

  constructor(public modal: NgbActiveModal) {}
}
