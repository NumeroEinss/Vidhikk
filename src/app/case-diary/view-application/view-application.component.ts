import { Component,  ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.scss',
})
export class ViewApplicationComponent {
  @ViewChild('printableContent') printableContent!: ElementRef;

  caseDiary: any[] = [
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Mumbai', viewValue: 'Mumbai' },
  ];

  constructor(private _router: Router) { }

  backButton() {
    this._router.navigate([`lawyer/case-diary/cases`]);
  }

  exportAsPDF(printableArea: string){
    let element = document.getElementById(printableArea) as HTMLElement;   
     html2canvas(element).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'cm', 'a4'); 
      pdf.addImage(contentDataURL, 'PNG', 2, 2, 27, 17);  
      pdf.save('Filename.pdf');   
    }); 
  }

  print() {
    let printContents = this.printableContent.nativeElement.innerHTML;
    let originalContents = document.body.innerHTML; 
    let printableContentWithMargins = `
        <div style="margin: 40px;"> 
            ${printContents}
        </div>`;
    document.body.innerHTML = printableContentWithMargins;
    window.print();
    document.body.innerHTML = originalContents;
  }
}
