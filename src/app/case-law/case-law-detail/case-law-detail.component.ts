import { Location } from '@angular/common';
import { Component,  ViewChild, ElementRef, Input} from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-case-law-detail',
  templateUrl: './case-law-detail.component.html',
  styleUrl: './case-law-detail.component.scss'
})
export class CaseLawDetailComponent {
  @ViewChild('printableContent') printableContent!: ElementRef;
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };

  constructor(private _location: Location) { }

  routeBack() {
    this._location.back();
  }

  exportAsPDF(sectionToPrint: string){
    let element = document.getElementById(sectionToPrint) as HTMLElement;   
     html2canvas(element).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); 
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
