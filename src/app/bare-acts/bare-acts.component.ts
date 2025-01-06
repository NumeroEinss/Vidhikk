import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApolloService } from '../shared/services/apollo.service';
import { Router } from '@angular/router';
import { SearchService } from '../shared/services/search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-bare-acts',
  templateUrl: './bare-acts.component.html',
  styleUrl: './bare-acts.component.scss'
})
export class BareActsComponent {
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };
  @ViewChild('searchInput') searchInput!: ElementRef;
  bareActsList: any = [];
  filteredBareActsList: any = [];
  recordCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 50;
  bareActsControl = new FormControl();

  constructor(private _apolloService: ApolloService, private _router: Router, private _searchService: SearchService, private _dataService: DataService) {
    this.bareActsControl.valueChanges.pipe(
      debounceTime(300), // Add a debounce to limit the number of API calls
      switchMap(value => this._searchService.searchBareActs(value))
    ).subscribe(data => {
      this.filteredBareActsList = data.acts;
      this.recordCount = data.totalCount;
      this.currentPage = 1;
    });
    // console.log(this._dataService.getData()?.bareActsControl, 'constructor')
    if (this._dataService.getData()?.bareActsControl != undefined) {
      this.bareActsControl.patchValue(this._dataService.getData()?.bareActsControl);
      this.searchStyle = { width: '100%', display: 'flex' };
      this.searchIcon = { width: '0px', display: 'none' };
    }
    else {
      this.getBareActs(this.currentPage)
    }
  }

  getBareActs(page: number) {
    this._apolloService.get(`/act?page=${page}&pageSize=${this.pageSize}`).subscribe(objRes => {
      if (objRes.status == "success") {
        this.bareActsList = objRes.data.acts;
        this.filteredBareActsList = this.bareActsList;
        this.recordCount = objRes.data.totalCount;
      }
    })
  }

  viewBareActs(caseId: any) {
    // console.log(this.bareActsControl.value, 'BareActsValue')
    if (this.bareActsControl.value != '') {
      this._dataService.setData({ currentPage: this.currentPage, bareActsControl: this.bareActsControl.value });
    }
    else {
      // console.log(this.bareActsControl.value, 'Qwerty')
      this._dataService.setData({ currentPage: this.currentPage, bareActsControl: '' });
    }
    this._router.navigate([`/lawyer/bare-acts/view/${caseId}`]);
  }

  nextPage(): void {
    let val = this.currentPage += 1;
    console.log(val, 'Index')
    this.getBareActs(val);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      let val = this.currentPage -= 1;
      this.getBareActs(val);
    }
  }

  goToPage(e: any) {
    this.currentPage = e;
    this.getBareActs(this.currentPage);
  }

  openSearch() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  // filterBareActs(e: any) {
  //   let filter = e.target.value.toLowerCase();
  //   if (filter == "") {
  //     this.currentPage = 1;
  //     this.getBareActs(this.currentPage);
  //   }
  //   else {
  //     this.filteredBareActsList = this.bareActsList.filter((key: any) =>
  //       key.title.toLowerCase().startsWith(filter)
  //     );
  //   }
  // }
}
