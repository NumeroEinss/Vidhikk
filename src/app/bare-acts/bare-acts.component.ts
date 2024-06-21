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

  constructor(private _apolloService: ApolloService, private _router: Router) {
    this.getBareActs();
  }

  getBareActs() {
    this._apolloService.get(`/act`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.bareActsList = objRes.data;
        this.recordCount = this.bareActsList.length;
      }
    })
  }

  viewBareActs(caseId: any) {
    this._router.navigate([`lawyer/case-law/bare-acts/view/${caseId}`]);
  }
}
