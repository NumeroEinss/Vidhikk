import { Component, ViewChild, ElementRef } from '@angular/core';
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

  // exportAsPDF(printableArea: string){
  //   let element = document.getElementById(printableArea) as HTMLElement;   
  //    html2canvas(element).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'cm', 'a4'); 
  //     pdf.addImage(contentDataURL, 'PNG', 2, 2, 27, 17);  
  //     pdf.save('Filename.pdf');   
  //   }); 
  // }

  exportAsPDF(printableArea: string) {
    if (window.innerWidth > 1023) {
      let element = document.getElementById(printableArea) as HTMLElement;
      html2canvas(element).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 1, 1, 20, 17);
        pdf.save('Filename.pdf');
      });
    }
    else if(window.innerWidth <1023){
      let element = document.getElementById(printableArea) as HTMLElement;
      html2canvas(element, { scale: 1, width: 560, height: 800 }).then(canvas => {
        var imgData = canvas.toDataURL("image/jpeg");
        var pdf = new jspdf('p', 'cm', 'a4');
        pdf.addImage(imgData, 'JPEG', 1, 1, 17, 17);
        pdf.save("Test.pdf");
      });
    }
  }

  // print() {
  //   let printContents = this.printableContent.nativeElement.innerHTML;
  //   let originalContents = document.body.innerHTML;
  //   let printableContentWithMargins = `
  //       <div style="margin: 60px 10px 40px 40px;"> 
  //           ${printContents}
  //       </div>`;
  
  //   document.body.innerHTML = printableContentWithMargins;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // }


  print() {
    const content = this.printableContent.nativeElement.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
            @media print {
              body{
                font-size:18px;
                font-family: Poppins;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
              }

              .print-content{
                margin-top:15px
              }
                .bold {
                  font-weight: bold;
                }
          }
            </style>
            </head>
            <body>
             ${content}
            </body>
         </html>
       `);
       printWindow.document.close();
       printWindow.print();
     } else {
       console.error('Failed to open print window.');
     }
   }
}
