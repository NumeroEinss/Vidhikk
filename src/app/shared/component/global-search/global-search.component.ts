import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.scss'
})
export class GlobalSearchComponent {

  caseList = [
    {
      caseTitle: "Nabha Power Limited VS Punjab Corporation on 9 October, 2023",
      caseDesc: "Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..",
      court: "Supreme Court",
      bench: "FB",
      cited: 0,
      acts: "Acts:  ELECTRICITY ACT: S62S.86(1)(a),"
    },
    {
      caseTitle: "Nabha Power Limited VS Punjab Corporation on 9 October, 2023",
      caseDesc: "Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..",
      court: "Supreme Court",
      bench: "FB",
      cited: 0,
      acts: "Acts:  ELECTRICITY ACT: S62S.86(1)(a),"
    },
    {
      caseTitle: "Nabha Power Limited VS Punjab Corporation on 9 October, 2023",
      caseDesc: "Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..",
      court: "Supreme Court",
      bench: "FB",
      cited: 0,
      acts: "Acts:  ELECTRICITY ACT: S62S.86(1)(a),"
    },
    {
      caseTitle: "Nabha Power Limited VS Punjab Corporation on 9 October, 2023",
      caseDesc: "Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..",
      court: "Supreme Court",
      bench: "FB",
      cited: 0,
      acts: "Acts:  ELECTRICITY ACT: S62S.86(1)(a),"
    }
  ];

  constructor(private _router: Router) { }

  viewCase(caseId: any) {
    this._router.navigate([`lawyer/case-law/cases/view/${caseId}`])
  }
}
