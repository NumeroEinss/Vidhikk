import { Component } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { Router } from '@angular/router';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-case-law-list',
  templateUrl: './case-law-list.component.html',
  styleUrl: './case-law-list.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class CaseLawListComponent {
  selectedIndex: number = 0;
  recordCount: number = 2134;
  
  caseList = [
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
  ];
  courtList: any = [
    { name: 'Supreme Court', checked: false },
    { name: 'Madhya Pradesh', checked: false },
    { name: 'Andhra Pradesh', checked: false },
    { name: 'Karnataka', checked: false },
    { name: 'Maharashtra', checked: false },
    { name: 'Gujrat', checked: false },
    { name: 'Delhi', checked: false },
    { name: 'Uttar Pradesh', checked: false },
  ];
  courtFilter: string = '';
  searchList: any = [];
  journalList: any = [
    {
      name: 'NIJ',
      value: 'nij',
    },
    {
      name: 'OCR',
      value: 'ocr',
    },
    {
      name: 'OLR',
      value: 'olr',
    },
    {
      name: 'PCCR',
      value: 'pccr',
    },
    {
      name: 'PLJ',
      value: 'plj',
    },
    {
      name: 'GCD',
      value: 'gcd',
    },
    {
      name: 'GJH',
      value: 'gjh',
    },
    {
      name: 'ESC',
      value: 'ocr',
    },
  ];
  filteredJournalsList: any = [];
  actsList: any = [
    { name: 'The Indian Penal Code, 1860' },
    { name: 'The Code of Criminal Procedure, 1973x' },
    { name: 'The Goods and Services Tax (Compensation to States) Act, 2017' },
    {
      name: 'The Juvenile Justice (Care and Protection of Children) Act, 2015',
    },
    { name: 'The Environmental Protection Act, 1986' },
    { name: 'The Trademarks Act, 1999' },
    { name: 'The Hindu Marriage Act, 1955' },
    { name: 'TThe Maternity Benefit Act, 19610' },
    { name: 'The Indian Penal Code, 1860' },
    { name: 'The Indian Penal Code, 1860' },
    { name: 'The Indian Penal Code, 1860' },
    { name: 'The Indian Penal Code, 1860' },
    { name: 'The Indian Penal Code, 1860' },
  ];
  overruledList = [
    {
      previousAttorney: 'Karan Singh Vs Bhagwan Singh',
      currentAttorney: 'Shyam Sundar Vs Ram Kumar',
    },
    {
      previousAttorney: 'Shubhashis Vs Medical Council',
      currentAttorney: 'Medical Council Vs State of Rajasthan',
    },
    {
      previousAttorney: 'Rajiram Vs Ghisaram',
      currentAttorney: 'Shyam Sundar Vs Ram Kumar',
    },
    {
      previousAttorney: 'Sub Division Inspector of Post Vs Joseph',
      currentAttorney: 'AIR Vs Santosh Kumar',
    },
    {
      previousAttorney: 'Shubhashis Vs Medical Council',
      currentAttorney: 'Medical Council of India Vs State of Rajasthan',
    },
    {
      previousAttorney: 'Rajiram Vs Ghisaram',
      currentAttorney: 'Shyam Sundar Vs Ram Kumar',
    },
  ];
  judgeList: any = [
    {
      name: 'Anoop Chitkara',
      value: 'nij',
    },
    {
      name: 'Puneet Gupta',
      value: 'ocr',
    },
    {
      name: 'Sunil Awasthi',
      value: 'olr',
    },
    {
      name: 'Satyan Vaida',
      value: 'pccr',
    },
    {
      name: 'A Ali',
      value: 'plj',
    },
    {
      name: 'Jyotsana Dua',
      value: 'gcd',
    },
    {
      name: 'Ajay Goel',
      value: 'gjh',
    },
    {
      name: 'Anil Choudhary',
      value: 'ocr',
    },
  ];
  filteredJudgeList: any = [];
  actList = [
    {
      name: 'NIJ',
      value: 'nij',
    },
    {
      name: 'OCR',
      value: 'ocr',
    },
    {
      name: 'OLR',
      value: 'olr',
    },
    {
      name: 'PCCR',
      value: 'pccr',
    },
    {
      name: 'PLJ',
      value: 'plj',
    },
    {
      name: 'GCD',
      value: 'gcd',
    },
    {
      name: 'GJH',
      value: 'gjh',
    },
    {
      name: 'ESC',
      value: 'ocr',
    },
  ];
  filteredActList: any = [];
  actTypeList = [
    {
      name: '302',
      value: 'nij',
    },
    {
      name: '379',
      value: 'ocr',
    },
    {
      name: '504',
      value: 'olr',
    },
    {
      name: '351',
      value: 'pccr',
    },
    {
      name: '132020',
      value: 'plj',
    },
    {
      name: 'S.110',
      value: 'gcd',
    },
    {
      name: 'S.11(a)',
      value: 'gjh',
    },
    {
      name: 'S.11(b)',
      value: 'ocr',
    },
  ];
  filteredActTypeList: any = [];
  yearList: any = [
    { value: 2018, viewValue: 2018 },
    { value: 2019, viewValue: 2019 },
    { value: 2020, viewValue: 2020 },
    { value: 2021, viewValue: 2021 },
  ];
  filteredYearList: any = [];
  volumeList: any = [
    { value: 'volume1', viewValue: 'Volume1' },
    { value: 'volume2', viewValue: 'Volume2' },
    { value: 'volume3', viewValue: 'Volume3' },
    { value: 'volume4', viewValue: 'Volume4' },
  ];
  filteredVolumeList: any = [];

  constructor(private _router: Router) {
    this.searchList = this.courtList;
    this.filteredJournalsList = this.journalList;
    this.filteredJudgeList = this.judgeList;
    this.filteredActList = this.actList;
    this.filteredActTypeList = this.actTypeList;
    this.filteredYearList = this.yearList;
    this.filteredVolumeList = this.volumeList;
  }

  tabSelectionChange(e: any) {}

  onKey(e: any = { target: { value: '' } }) {
    this.searchList = this.search(e.target.value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.courtList.filter((option: any) =>
      option.name.toLowerCase().startsWith(filter)
    );
  }

  closed(e: any) {
    console.log(e);
  }

  updateAllComplete() {}

  sort(sortValue: string) {
    console.log(sortValue);
  }

  filterJournal(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredJournalsList = this.journalList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }

  viewCase(caseId: any) {
    this._router.navigate([`lawyer/case-law/cases/view/${caseId}`]);
  }

  viewBareActs(caseId: any) {
    this._router.navigate([`lawyer/case-law/bare-acts/view/${caseId}`]);
  }

  filterJudge(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredJudgeList = this.judgeList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }
  filterAct(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredActList = this.actList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }
  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }
  filterActType(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredActTypeList = this.actList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }
}
