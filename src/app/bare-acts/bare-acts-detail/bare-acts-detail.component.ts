import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { HighlightOnSearchPipe } from '../../shared/pipe/highlight-on-search.pipe';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-bare-acts-detail',
  templateUrl: './bare-acts-detail.component.html',
  styleUrl: './bare-acts-detail.component.scss'
})

export class BareActsDetailComponent {
  @ViewChild('scrollbar')
  scrollbar!: NgScrollbar;
  @Input() searchStyle = { width: '100%', display: 'flex' };
  @Input() searchIcon = { width: '0px', display: 'none' };
  value: string = "";
  sectionList: any = [];
  searchTerm: string = "";

  sections = [
    { value: '1', viewValue: 'S.1' },
    { value: '2', viewValue: 'S.2' },
    { value: '3', viewValue: 'S.3' },
    { value: '4', viewValue: 'S.4' },
    { value: '5', viewValue: 'S.5' },
    { value: '6', viewValue: 'S.6' },
    { value: '7', viewValue: 'S.7' },
  ];

  bareActData: any;
  bareActList = [];
  bareActsDocument: any;

  constructor(private _location: Location, private _router: Router, private _apolloService: ApolloService, private _higlightOnSearch: HighlightOnSearchPipe) {
    // this.sectionList = this.sections;
    let params: any = this._router.url.split('/');
    let bareActId = params[params.length - 1];
    this.getBareActDetail(bareActId);
  }

  routeBack() {
    this._location.back();
  }

  selected(event: any, val: string) {
    let element = document.getElementById(this.value) as HTMLElement
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  filterSection(e: any) {
    let filter = e.target.value.toLowerCase();
    this.sectionList = this.sections.filter((key: any) =>
      key.viewValue.toLowerCase().startsWith(filter)
    );
  }

  getBareActDetail(id: any) {
    this._apolloService.get(`/act/details/${id}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.bareActData = objRes.data;
        this.bareActsDocument = this.bareActData?.contents;
      }
    })
  }

  clearSelection() {
    this.bareActsDocument = this.bareActData?.contents;
    this.searchTerm = "";
    this.higlightOnSearch();
    this.scrollbar.scrollTo({ top: 0 });
  }

  higlightOnSearch() {
    let doc = document.getElementById('bareActs') as HTMLElement;
    doc.innerHTML = this._higlightOnSearch.transform(doc.innerHTML, this.searchTerm);
    setTimeout(() => {
      const firstMarked = document.querySelector('marked');
      if (firstMarked) {
        firstMarked.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  }
}
