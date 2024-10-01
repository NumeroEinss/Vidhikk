import { G } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  templateObj: Observable<any> = new BehaviorSubject<any>([]);

  templateList: any = this.templateObj as Observable<[]>;

  constructor(private http: HttpClient) {
    this.getTemplateList();
  }


  getTemplateList() {
    this.http.get(`assets/JSON/templates.json`).subscribe((x: any) => {
      let mappedArr = x.map((temp: any) => {
        let obj = { value: temp.application_type, viewValue: temp.application_type };
        return obj;
      })
      mappedArr.unshift({ value: "Select", viewValue: "Select" });
      this.templateList.next(mappedArr);
    });
  }

  getTemplate(): Observable<any> {
    return this.http.get(`assets/JSON/templates.json`);
  }
}
