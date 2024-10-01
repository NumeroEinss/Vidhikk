import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';

@Component({
  selector: 'app-bare-acts-detail',
  templateUrl: './bare-acts-detail.component.html',
  styleUrl: './bare-acts-detail.component.scss'
})

export class BareActsDetailComponent {
  value: string = "";
  sectionList: any = [];

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
  bareActList = [
    // {
    //   id: '1',
    //   section: 'S.1',
    //   title: 'Title and extent of operation of the Code.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
    // {
    //   id: '2',
    //   section: 'S.2',
    //   title: 'Punishment of offences committed with in India.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
    // {
    //   id: '3',
    //   section: 'S.3',
    //   title: 'Title and extent of operation of the Code.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
    // {
    //   id: '4',
    //   section: 'S.4',
    //   title: 'Punishment of offences committed with in India.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
    // {
    //   id: '5',
    //   section: 'S.5',
    //   title: 'Punishment of offences committed with in India.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
    // {
    //   id: '6',
    //   section: 'S.6',
    //   title: 'Punishment of offences committed with in India.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
    // {
    //   id: '7',
    //   section: 'S.7',
    //   title: 'Punishment of offences committed with in India.',
    //   detailHeader: 'This Act shall be called the Indian Penal Code, and shall 1 [extend to the whole of India 2***].',
    //   details: [
    //     '1.The Original words have successively been amended by Act 12 of 1891, s. 2 and Sch. I, the A.O. 1937, the A.O. 1948 and the A.O. 1950 to read as above.',
    //     '2.The words "except the State of Jammu and Kashmir" omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019).'
    //   ],
    // },
  ];

  constructor(private _location: Location, private _router: Router, private _apolloService: ApolloService) {
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
      }
    })
  }
}
