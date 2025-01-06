import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ToastMessageService } from '../../services/snack-alert.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() currentPage: number = 1;
  @Input() recordCount: number = 0;
  @Input() pageSize: number = 0;
  @Output() previousPageEvent: EventEmitter<number> = new EventEmitter();
  @Output() nextPageEvent: EventEmitter<number> = new EventEmitter();
  @Output() goToPageEvent: EventEmitter<number> = new EventEmitter();
  pageInput!: number;

  constructor(private _toastMessage: ToastMessageService) { }

  previousPage() {
    this.previousPageEvent.emit();
  }

  nextPage() {
    this.nextPageEvent.emit();
  }

  getPageCount(value: any) {
    return Math.ceil(value);
  }

  goToPage() {
    if (this.pageInput == undefined) {
      this._toastMessage.error('Enter valid page !!');
    }
    else if (this.pageInput == 0) {
      this._toastMessage.error('Enter valid page !!');
    }
    else if (this.pageInput > this.getPageCount(this.recordCount / this.pageSize)) {
      this._toastMessage.error('Enter valid page !!');
    }
    else {
      this.goToPageEvent.emit(this.pageInput);
    }
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }
}
