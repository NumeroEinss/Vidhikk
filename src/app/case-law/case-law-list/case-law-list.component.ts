import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { SearchService } from '../../shared/services/search.service';

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

  @ViewChild('appInput') appInputRef!: ElementRef;
  @ViewChild('respInput') respInputRef!: ElementRef;
  @ViewChild('judgSearch') judgeSearchRef!: ElementRef;

  selectedIndex: number = 0;
  recordCount: number = 0;

  caseList: any = [
    // {
    //   caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
    //   caseDesc:
    //     'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
    //   court: 'Supreme Court',
    //   bench: 'FB',
    //   cited: 0,
    //   acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    // },
    // {
    //   caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
    //   caseDesc:
    //     'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
    //   court: 'Supreme Court',
    //   bench: 'FB',
    //   cited: 0,
    //   acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    // },
    // {
    //   caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
    //   caseDesc:
    //     'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
    //   court: 'Supreme Court',
    //   bench: 'FB',
    //   cited: 0,
    //   acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    // },
    // {
    //   caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
    //   caseDesc:
    //     'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
    //   court: 'Supreme Court',
    //   bench: 'FB',
    //   cited: 0,
    //   acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    // },
  ];
  courtList: any = [
    // { name: 'Supreme Court', checked: false },
    // { name: 'Madhya Pradesh', checked: false },
    // { name: 'Andhra Pradesh', checked: false },
    // { name: 'Karnataka', checked: false },
    // { name: 'Maharashtra', checked: false },
    // { name: 'Gujrat', checked: false },
    // { name: 'Delhi', checked: false },
    // { name: 'Uttar Pradesh', checked: false },
  ];
  filteredCourtList: any = [];

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
    // {
    //   name: 'Anoop Chitkara',
    //   value: 'nij',
    // },
    // {
    //   name: 'Puneet Gupta',
    //   value: 'ocr',
    // },
    // {
    //   name: 'Sunil Awasthi',
    //   value: 'olr',
    // },
    // {
    //   name: 'Satyan Vaida',
    //   value: 'pccr',
    // },
    // {
    //   name: 'A Ali',
    //   value: 'plj',
    // },
    // {
    //   name: 'Jyotsana Dua',
    //   value: 'gcd',
    // },
    // {
    //   name: 'Ajay Goel',
    //   value: 'gjh',
    // },
    // {
    //   name: 'Anil Choudhary',
    //   value: 'ocr',
    // },
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

  private searchTerms = new Subject<string>();

  judgeSearch: string = "";

  showAppSearch: boolean = true;
  resAppList: Array<any> = [];

  showRespSearch: boolean = true;
  resRespList: Array<any> = [];

  showJudgeSearch: boolean = true;
  respJudgeList: Array<any> = [];

  hasMore = true;
  page: number = 1;

  selectedCourt: string = "";

  showCitationSearch: boolean = true;
  citationList: Array<any> = [];

  constructor(private _router: Router, private _toastMessage: ToastMessageService, private _apolloService: ApolloService,
    private _searchService: SearchService, private _dateAdapter: DateAdapter<Date>) {
    this._dateAdapter.setLocale('en-GB');
    this.filteredJournalsList = this.journalList;
    this.getCaseLaws();
    this.getJudgeList();
    this.getCourtList();
    this.filteredActList = this.actList;
    this.filteredActTypeList = this.actTypeList;
    this.filteredYearList = this.yearList;
    this.filteredVolumeList = this.volumeList;
  }

  ngOnInit() {
    // this.searchTerms.pipe(
    //   debounceTime(300),        // Wait for 300ms pause in events
    //   distinctUntilChanged(),   // Ignore if next search term is same as previous
    //   switchMap((term: string) => this._searchService.search(term))
    // ).subscribe(results => {
    //   this.filteredJudgeList = results
    //   this.hasMore = results.length > 1000; // Assuming page size is 10
    // });
  }

  tabSelectionChange(e: any) {
    switch (e.index) {
      case 0:
        this.getCaseLaws();
        break;
      case 1:
        this.showAppSearch = true;
        break;
      case 2:
        this.showRespSearch = true;
        break;
      case 3:
        this.showJudgeSearch = true;
        break;
      case 4:
        this.showCitationSearch = true;
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
    }
  }

  sort(sortValue: string) {
  }

  viewCase(caseId: any, keyWord: string = "") {
    const extras = { keyWord: keyWord }
    this._router.navigate([`lawyer/case-law/cases/view/${caseId}`], { state: extras });
  }

  filterJudge(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredJudgeList = this.judgeList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }
  // filterJudge(value: any) {
  //   this.searchTerms.next(value.target.value);
  // }

  loadMore(keyWord: any): void {
    this.page++;
    if (this.judgeSearch == "") {
      this._apolloService.get(`/judge?page=${this.page}&pageSize=1000`).subscribe(resObj => {
        if (resObj.status == "success") {
          this.judgeList = [...this.filteredJudgeList, ...resObj.data];
          this.judgeList = [...new Set(this.judgeList)];
          this.filteredJudgeList = this.judgeList;
        }
      })
    }
    else {
      this._apolloService.get(`/judge/search/${this.judgeSearch}?page=1&pageSize=1000`).subscribe(resObj => {
        if (resObj.status == "success") {
          this.judgeList = [...this.filteredJudgeList, ...resObj.data];
          this.judgeList = [...new Set(this.judgeList)];
          this.filteredJudgeList = this.judgeList;
        }
      })
    }
    // this._searchService.search(keyWord).subscribe(items => {
    //   this.filteredJudgeList = [...this.filteredJudgeList, ...items];
    //   this.hasMore = items.length > 1000;
    // });
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
    this.filteredActTypeList = this.actTypeList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }

  getJudgeList() {
    this._apolloService.get('/judge?page=1&pageSize=1000').subscribe(resObj => {
      if (resObj.status == "success") {
        this.judgeList = resObj.data;
        this.filteredJudgeList = this.judgeList;
      }
    })
  }

  getJudgeByName() {
    if (this.judgeSearch == "") {
      this.getJudgeList();
    }
    else {
      this._apolloService.get(`/judge/search/${this.judgeSearch}?page=1&pageSize=1000`).subscribe(resObj => {
        if (resObj.status == "success") {
          this.judgeList = resObj.data;
          this.filteredJudgeList = this.judgeList;
        }
      })
    }
  }

  getCourtList() {
    this._apolloService.get('/court?page=1&pageSize=2000').subscribe(resObj => {
      if (resObj.status == "success") {
        this.courtList = resObj.data;
        this.filteredCourtList = this.courtList;
      }
    })
  }

  filterCourt(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredCourtList = this.courtList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }

  clearCourtFilter() {
    this.filteredCourtList = this.courtList;
    this.selectedCourt = "";
  }

  getCaseLaws() {
    this._apolloService.get(`/judgement/latest`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.caseList = objRes.data;
        this.recordCount = this.caseList.length;
      }
    })
  }

  getCaseLawByCourt() {
    let selectedCourt = this.filteredCourtList.find((x: any) => x.name == this.selectedCourt);
    if (selectedCourt == undefined) {
      this.getCaseLaws();
    }
    else {
      this._apolloService.get(`/judgement/search/court/${selectedCourt.name}?page=1&pageSize=10`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.caseList = objRes.data;
          this.recordCount = this.caseList.length;
        }
      })
    }
  }

  getCaseLawByApplicant(keyWord: string) {
    if (keyWord == undefined) {
      this._toastMessage.error('Applicant name is required !!');
    }
    else if (keyWord == "") {
      this._toastMessage.error('Applicant name is required !!');
    }
    else {
      this._apolloService.get(`/judgement/search/appellant/${keyWord}`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.resAppList = objRes.data;
          this.recordCount = this.resAppList.length;
          this.showAppSearch = !this.showAppSearch;
        }
      })
    }
  }

  getCaseLawByRespondent(keyWord: string) {
    if (keyWord == undefined) {
      this._toastMessage.error('Respondent name is required !!');
    }
    else if (keyWord == "") {
      this._toastMessage.error('Respondent name is required !!');
    }
    else {
      this._apolloService.get(`/judgement/search/respondents/${keyWord}`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.resRespList = objRes.data;
          this.recordCount = this.resRespList.length;
          this.showRespSearch = !this.showRespSearch;
        }
      })
    }
  }

  getCaseLawByJudges(keyWord: string) {
    if (keyWord == undefined) {
      this._toastMessage.error('Judge name is required !!');
    }
    else if (keyWord == "") {
      this._toastMessage.error('Judge name is required !!');
    }
    else {
      this._apolloService.get(`/judgement/search/judges/${keyWord}`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.respJudgeList = objRes.data;
          this.recordCount = this.respJudgeList.length;
          this.showJudgeSearch = !this.showJudgeSearch;
        }
      })
    }
  }

  eleminateWhiteSpace(e: any) {
    let value = e.target.value;
    const regex = /^\s/;
    return regex.test(value);
  }

  getCitations(keyWord: string = "") {
    let data = { name: keyWord }
    this._apolloService.post(`/citation/search`, data).subscribe(objRes => {
      if (objRes.status == "success") {
        this.citationList = objRes.data;
        this.recordCount = this.citationList.length;
        this.showCitationSearch = !this.showCitationSearch;
      }
    })
  }
}