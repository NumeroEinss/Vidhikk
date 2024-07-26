import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  constructor() { }

  previousPage() {
    this.previousPageEvent.emit();
  }

  nextPage() {
    this.nextPageEvent.emit();
  }

  getPageCount(value: any) {
    return Math.ceil(value);
  }
}
