import { Component } from '@angular/core';
import { ApolloService } from '../shared/services/apollo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bare-acts',
  templateUrl: './bare-acts.component.html',
  styleUrl: './bare-acts.component.scss'
})
export class BareActsComponent {

  bareActsList: any = [];
  recordCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 50;

  constructor(private _apolloService: ApolloService, private _router: Router) {
    this.getBareActs(this.currentPage);
  }

  getBareActs(page: number) {
    this._apolloService.get(`/act?page=${page}&pageSize=${this.pageSize}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.bareActsList = objRes.data.acts;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }

  viewBareActs(caseId: any) {
    this._router.navigate([`/lawyer/bare-acts/view/${caseId}`]);
  }

  nextPage(): void {
    let val = this.currentPage += 1;
    this.getBareActs(val);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      let val = this.currentPage -= 1;
      this.getBareActs(val);
    }
  }
}
