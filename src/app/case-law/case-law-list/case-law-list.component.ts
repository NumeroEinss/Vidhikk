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
import { Subject, debounceTime, switchMap } from 'rxjs';
import { SearchService } from '../../shared/services/search.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdvanceSearchModel } from '../../common/advanceSearch.model';
import { EncryptionService } from '../../shared/services/encryption.service';

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

  caseLawCurrentPage: number = 1;

  caseList: any = [];

  courtList: any = [];
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

  overruledList = [];

  judgeList: any = [];
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

  judgeControl = new FormControl();

  advanceSearchForm: FormGroup;
  decisionDate = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  showAdvanceSearch: boolean = true;
  respAdvanceSearchList: any = [];
  advanceSearchCurrentPage: number = 1;

  showWordsSearch: boolean = true;
  respWordsPhraseList: any = [];
  wordsPhraseCurrentPage: number = 1;
  searchedWord: string = "";
  wordsPhraseRadioModel: number = 1;

  pageSize: number = 50;

  applicantCurrentPage: number = 1;

  respondantCurrentPage: number = 1;

  judgeWiseCurrentPage: number = 1;

  savedList: any = [];
  savedCurrentPage: number = 1;

  sharedList: any = [];
  sharedCurrentPage: number = 1;

  constructor(private _router: Router, private _toastMessage: ToastMessageService, private _apolloService: ApolloService,
    private _searchService: SearchService, private _dateAdapter: DateAdapter<Date>, private _formBuilder: FormBuilder,
    private _encryptService: EncryptionService) {
    this._dateAdapter.setLocale('en-GB');
    this.filteredJournalsList = this.journalList;
    this.getCaseLaws(1);
    this.getJudgeList();
    this.getCourtList();
    this.filteredActList = this.actList;
    this.filteredActTypeList = this.actTypeList;
    this.filteredYearList = this.yearList;
    this.filteredVolumeList = this.volumeList;
    this.advanceSearchForm = this._formBuilder.group(new AdvanceSearchModel)
  }

  ngOnInit() {
    this.judgeControl.valueChanges.pipe(
      debounceTime(300), // Add a debounce to limit the number of API calls
      switchMap(value => this._searchService.search(value))
    ).subscribe(data => {
      this.filteredJudgeList = data.judges;
    });

    this.advanceSearchForm.controls.judge.valueChanges.pipe(
      debounceTime(300), // Add a debounce to limit the number of API calls
      switchMap(value => this._searchService.search(value))
    ).subscribe(data => {
      this.filteredJudgeList = data.judges;
    });
  }

  tabSelectionChange(e: any) {
    switch (e.index) {
      case 0:
        this.getCaseLaws(this.caseLawCurrentPage);
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
        this.showWordsSearch = true;
        break;
      case 6:
        this.showAdvanceSearch = true;
        break;
      case 7:
        this.recordCount = 0;
        break;
      case 8:
        this.recordCount = 0;
        break;
    }
  }

  sort(sortValue: string) {
  }

  viewCase(caseId: any, keyWord: string = "") {
    const extras = { keyWord: keyWord, caseId: caseId }
    this._router.navigate([`lawyer/case-law/cases/view`], { state: extras });
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
    this._apolloService.get('/judge?page=1&pageSize=50').subscribe(resObj => {
      if (resObj.status == "success") {
        this.judgeList = resObj.data.judges;
        this.filteredJudgeList = this.judgeList;
      }
    })
  }

  getCourtList() {
    this._apolloService.get('/court').subscribe(resObj => {
      if (resObj.status == "success") {
        this.courtList = resObj.data.courts;
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

  getCaseLaws(page: number) {
    this._apolloService.get(`/judgement/latest?page=${page}&pageSize=${this.pageSize}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.caseList = objRes.data.items;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }

  getCaseLawByCourt() {
    let selectedCourt = this.filteredCourtList.find((x: any) => x.name == this.selectedCourt);
    if (selectedCourt == undefined) {
      this.getCaseLaws(1);
    }
    else {
      this._apolloService.get(`/judgement/search/court/${selectedCourt.name}?page=1&pageSize=10`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.caseList = objRes.data.court;
          this.recordCount = objRes.data.totalCount;
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
      this._apolloService.get(`/judgement/search/appellant/${keyWord}?page=${this.applicantCurrentPage}&pageSize=${this.pageSize}`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.resAppList = objRes.data.items;
          this.recordCount = objRes.data.totalCount;
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
      this._apolloService.get(`/judgement/search/respondents/${keyWord}?page=${this.respondantCurrentPage}&pageSize=${this.pageSize}`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.resRespList = objRes.data.items;
          this.recordCount = objRes.data.totalCount;
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
      this._apolloService.get(`/judgement/search/judges/${keyWord}?page=${this.judgeWiseCurrentPage}&pageSize=${this.pageSize}`).subscribe(objRes => {
        if (objRes.status == "success") {
          this.respJudgeList = objRes.data.items;
          this.recordCount = objRes.data.totalCount;
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

  getCaseLawByAdvanceSearch(page: number) {
    this._apolloService.post(`/judgement/search/advanced?page=${page}&pageSize=${this.pageSize}`, this.advanceSearchForm.value).subscribe(objRes => {
      if (objRes.status == "success") {
        this.respAdvanceSearchList = objRes.data.items;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }

  resetAdvanceSearchForm() {
    this.advanceSearchForm.reset();
    this.advanceSearchForm.patchValue(new AdvanceSearchModel());
  }

  getCaseLawsByWords(page: number) {
    if (this.searchedWord == '') {
      this._toastMessage.error('Please Enter any text !!');
      this.showWordsSearch = !this.showWordsSearch;
    }
    else {
      let data = {
        text: this.searchedWord,
        exact: this.wordsPhraseRadioModel
      }
      this._apolloService.post(`/judgement/search/words?page=${page}&pageSize=${this.pageSize}`, data).subscribe(objRes => {
        if (objRes.status == "success") {
          this.respWordsPhraseList = objRes.data.items;
          this.recordCount = objRes.data.totalCount;
        }
      })
    }
  }

  getHeadingLength(): number {
    return (window.innerWidth > 1199) ? 90 : 30;
  }

  getCharLength(): number {
    return (window.innerWidth > 1199) ? 440 : 200;
  }

  getPaginatedCaseLawByApplicant(page: number) {
    this._apolloService.get(`/judgement/search/appellant/${this.appInputRef.nativeElement.value}?page=${page}&pageSize=${this.pageSize}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.resAppList = objRes.data.items;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }

  getPaginatedCaseLawByRespondant(page: number) {
    this._apolloService.get(`/judgement/search/respondents/${this.respInputRef.nativeElement.value}?page=${page}&pageSize=${this.pageSize}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.resRespList = objRes.data.items;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }

  nextPageEvent(type: string) {
    switch (type) {
      case 'Latest':
        var val = this.caseLawCurrentPage += 1;
        this.getCaseLaws(val);
        break;
      case 'Applicant':
        var val = this.applicantCurrentPage += 1;
        this.getPaginatedCaseLawByApplicant(val);
        break;
      case 'Respondant':
        var val = this.respondantCurrentPage += 1;
        this.getPaginatedCaseLawByRespondant(val);
        break;
      case 'Judge':
        var val = this.judgeWiseCurrentPage += 1;
        this.getPaginatedCaseLawByJudges(val);
        break;
      case 'Citation':
        break;
      case 'Words':
        var val = this.wordsPhraseCurrentPage += 1;
        this.getCaseLawsByWords(val);
        break;
      case 'Advance':
        var val = this.advanceSearchCurrentPage += 1;
        this.getCaseLawByAdvanceSearch(val);
        break;
      case 'Saved':
        break;
      case 'Shared':
        break;
    }
  }

  previousPageEvent(type: string) {
    switch (type) {
      case 'Latest':
        if (this.caseLawCurrentPage > 1) {
          let val = this.caseLawCurrentPage -= 1;
          this.getCaseLaws(val);
        }
        break;
      case 'Applicant':
        if (this.applicantCurrentPage > 1) {
          let val = this.applicantCurrentPage -= 1;
          this.getPaginatedCaseLawByApplicant(val);
        }
        break;
      case 'Respondant':
        if (this.respondantCurrentPage > 1) {
          let val = this.respondantCurrentPage -= 1;
          this.getPaginatedCaseLawByRespondant(val);
        }
        break;
      case 'Judge':
        if (this.judgeWiseCurrentPage > 1) {
          let val = this.judgeWiseCurrentPage -= 1;
          this.getPaginatedCaseLawByJudges(val);
        }
        break;
      case 'Citation':
        break;
      case 'Words':
        if (this.wordsPhraseCurrentPage > 1) {
          let val = this.wordsPhraseCurrentPage -= 1;
          this.getCaseLawsByWords(val);
        }
        break;
      case 'Advance':
        if (this.advanceSearchCurrentPage > 1) {
          let val = this.advanceSearchCurrentPage -= 1;
          this.getCaseLawByAdvanceSearch(val);
        }
        break;
      case 'Saved':
        break;
      case 'Shared':
        break;
    }
  }

  goToPageEvent(type: string, e: any) {
    switch (type) {
      case 'Latest':
        this.caseLawCurrentPage = e;
        this.getCaseLaws(this.caseLawCurrentPage);
        break;
      case 'Applicant':
        this.applicantCurrentPage = e;
        this.getPaginatedCaseLawByApplicant(this.applicantCurrentPage);
        break;
      case 'Respondant':
        this.respondantCurrentPage = e;
        this.getPaginatedCaseLawByRespondant(this.respondantCurrentPage);
        break;
      case 'Judge':
        this.judgeWiseCurrentPage = e;
        this.getPaginatedCaseLawByJudges(this.judgeWiseCurrentPage);
        break;
      case 'Citation':
        break;
      case 'Words':
        this.wordsPhraseCurrentPage = e;
        this.getCaseLawsByWords(this.wordsPhraseCurrentPage);
        break;
      case 'Advance':
        this.advanceSearchCurrentPage = e;
        this.getCaseLawByAdvanceSearch(this.advanceSearchCurrentPage);
        break;
      case 'Saved':
        break;
      case 'Shared':
        break;
    }
  }

  getPaginatedCaseLawByJudges(page: number) {
    this._apolloService.get(`/judgement/search/judges/${this.judgeControl.value}?page=${page}&pageSize=${this.pageSize}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.respJudgeList = objRes.data.items;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }
}