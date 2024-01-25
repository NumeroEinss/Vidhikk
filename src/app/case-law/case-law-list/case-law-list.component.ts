import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-law-list',
  templateUrl: './case-law-list.component.html',
  styleUrl: './case-law-list.component.scss'
})
export class CaseLawListComponent {

  selectedIndex: number = 0;
  recordCount: number = 2134;
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
  courtList: any = [
    { name: 'Supreme Court', checked: false }, { name: 'Madhya Pradesh', checked: false }, { name: 'Andhra Pradesh', checked: false },
    { name: 'Karnataka', checked: false }, { name: 'Maharashtra', checked: false }, { name: 'Gujrat', checked: false }, { name: 'Delhi', checked: false },
    { name: 'Uttar Pradesh', checked: false }
  ];
  courtFilter: string = "";
  searchList: any = [];
  journalList: any = [
    {
      name: 'NIJ', value: 'nij'
    },
    {
      name: 'OCR', value: 'ocr'
    },
    {
      name: 'OLR', value: 'olr'
    },
    {
      name: 'PCCR', value: 'pccr'
    },
    {
      name: 'PLJ', value: 'plj'
    },
    {
      name: 'GCD', value: 'gcd'
    },
    {
      name: 'GJH', value: 'gjh'
    },
    {
      name: 'ESC', value: 'ocr'
    }
  ];
  filteredJournalsList: any = [];
  actsList: any = [
    { name: "The Indian Penal Code, 1860" },
    { name: "The Code of Criminal Procedure, 1973x" },
    { name: "The Goods and Services Tax (Compensation to States) Act, 2017" },
    { name: "The Juvenile Justice (Care and Protection of Children) Act, 2015" },
    { name: "The Environmental Protection Act, 1986" },
    { name: "The Trademarks Act, 1999" },
    { name: "The Hindu Marriage Act, 1955" },
    { name: "TThe Maternity Benefit Act, 19610" },
    { name: "The Indian Penal Code, 1860" },
    { name: "The Indian Penal Code, 1860" },
    { name: "The Indian Penal Code, 1860" },
    { name: "The Indian Penal Code, 1860" },
    { name: "The Indian Penal Code, 1860" },
  ];
  overruledList = [
    {
      previousAttorney: "Karan Singh Vs Bhagwan Singh",
      currentAttorney: "Shyam Sundar Vs Ram Kumar"
    },
    {
      previousAttorney: "Shubhashis Vs Medical Council",
      currentAttorney: "Medical Council Vs State of Rajasthan"
    },
    {
      previousAttorney: "Rajiram Vs Ghisaram",
      currentAttorney: "Shyam Sundar Vs Ram Kumar"
    },
    {
      previousAttorney: "Sub Division Inspector of Post Vs Joseph",
      currentAttorney: "AIR Vs Santosh Kumar"
    },
    {
      previousAttorney: "Shubhashis Vs Medical Council",
      currentAttorney: "Medical Council of India Vs State of Rajasthan"
    },
    {
      previousAttorney: "Rajiram Vs Ghisaram",
      currentAttorney: "Shyam Sundar Vs Ram Kumar"
    }
  ];
  judgeList: any = [
    {
      name: 'Anoop Chitkara', value: 'nij'
    },
    {
      name: 'Puneet Gupta', value: 'ocr'
    },
    {
      name: 'Sunil Awasthi', value: 'olr'
    },
    {
      name: 'Satyan Vaida', value: 'pccr'
    },
    {
      name: 'A Ali', value: 'plj'
    },
    {
      name: 'Jyotsana Dua', value: 'gcd'
    },
    {
      name: 'Ajay Goel', value: 'gjh'
    },
    {
      name: 'Anil Choudhary', value: 'ocr'
    }
  ];
  filteredJudgeList: any = [];
  actList = [
    {
      name: 'NIJ', value: 'nij'
    },
    {
      name: 'OCR', value: 'ocr'
    },
    {
      name: 'OLR', value: 'olr'
    },
    {
      name: 'PCCR', value: 'pccr'
    },
    {
      name: 'PLJ', value: 'plj'
    },
    {
      name: 'GCD', value: 'gcd'
    },
    {
      name: 'GJH', value: 'gjh'
    },
    {
      name: 'ESC', value: 'ocr'
    }
  ];
  actTypeList = [
    {
      name: '302', value: 'nij'
    },
    {
      name: '379', value: 'ocr'
    },
    {
      name: '504', value: 'olr'
    },
    {
      name: '351', value: 'pccr'
    },
    {
      name: '132020', value: 'plj'
    },
    {
      name: 'S.110', value: 'gcd'
    },
    {
      name: 'S.11(a)', value: 'gjh'
    },
    {
      name: 'S.11(b)', value: 'ocr'
    }
  ];

  constructor(private _router: Router) {
    this.searchList = this.courtList;
    this.filteredJournalsList = this.journalList;
    this.filteredJudgeList = this.judgeList;
  }

  tabSelectionChange(e: any) { }

  onKey(e: any = { target: { value: "" } }) {
    this.searchList = this.search(e.target.value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.courtList.filter((option: any) => option.name.toLowerCase().startsWith(filter));
  }

  closed(e: any) {
    console.log(e);
  }

  updateAllComplete() {

  }

  sort(sortValue: string) {
    console.log(sortValue)
  }

  filterJournal(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredJournalsList = this.journalList.filter((key: any) => key.name.toLowerCase().startsWith(filter));
  }

  viewCase(caseId: any) {
    this._router.navigate([`case-law/cases/view/${caseId}`])
  }

  filterJudge(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredJudgeList = this.judgeList.filter((key: any) => key.name.toLowerCase().startsWith(filter));
  }
}
