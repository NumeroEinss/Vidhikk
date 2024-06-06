import { G } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  templateList = [];

  constructor(private http: HttpClient) {
    if (this.templateList.length == 0) { this.getTemplateList() };
  }


  getTemplateList() {
    this.http.get(`assets/JSON/templates.json`).subscribe((x: any) => {
      this.templateList = x.map((temp: any) => {
        let obj = { value: temp.application_type, viewValue: temp.application_type };
        return obj;
      })
      console.log(this.templateList);
    });
  }

  getTemplate(): Observable<any> {
    return this.http.get(`assets/JSON/templates.json`);
  }
}
