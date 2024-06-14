import { Location } from '@angular/common';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';

@Component({
  selector: 'app-case-law-detail',
  templateUrl: './case-law-detail.component.html',
  styleUrl: './case-law-detail.component.scss'
})
export class CaseLawDetailComponent {
  @ViewChild('printableContent') printableContent!: ElementRef;
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };

  // vidhikLogoUrl = '../../../../assets/images/icons/vidhiklogo.svg';
  caseId: any;
  caseDiaryDetail: any;
  userName: any

  constructor(private _location: Location, private _router: Router,
    private _toastMessage: ToastMessageService, private _apolloService: ApolloService) {
    this.caseId = this._router.url.split('/').pop();
    this.getCaseDiaryDetail();
    this.userName = JSON.parse(localStorage.getItem('userData')!);
  }

  routeBack() {
    this._location.back();
  }

  getMailtoLink() {
    const emailAddress = 'recipient@example.com';
    const cc = 'cc@example.com';
    const bcc = 'bcc@example.com';
    const subject = 'Your Subject Here';
    let divId = 'section-to-print'
    const divContent = document.getElementById(divId)?.innerHTML.replace(/<[^>]*>/g, '');
    return `mailto:${emailAddress}?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${divContent}`
  }

  exportAsPDF(printableArea: string) {
    this._toastMessage.message('Pdf is downloading');
    if (window.innerWidth > 1023) {
      let element = document.getElementById(printableArea) as HTMLElement;
      html2canvas(element).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 1, 2, 19, 17);
        pdf.save('Filename.pdf');
      });
    }
    else if (window.innerWidth < 1023) {
      let element = document.getElementById(printableArea) as HTMLElement;
      html2canvas(element, { scale: 1, width: 670, height: 800 }).then(canvas => {
        var imgData = canvas.toDataURL("image/jpeg");
        var pdf = new jspdf('p', 'cm', 'a4');
        pdf.addImage(imgData, 'JPEG', 1, 1, 17, 17);
        pdf.save("Test.pdf");
      });
    }
  }

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
                font-family: Poppins;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
              }
              .logo{
                width:100%;
                height:65px;
                text-align:center;
                background-image:url("../../../../assets/images/icons/vidhiklogo.svg");
                background-repeat: no-repeat, repeat;
                background-position:center;
              }
              .header{
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #8798ad;
                text-align: center;
                
              }
              .highlighted-text {
                font-size: 18px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #2E5BFF;
                width: 100%;
                margin-top: 38px;
                
              }

              .title {
                font-size: 18px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: black;
                width: 100%;
                font-family:Poppins;
            }

            .description {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.4;
              letter-spacing: normal;
              font-family:Poppins;
              margin-top:30px;
              font-size: 16px;
      
              .desc-head {
                  max-width: 590px; 
                  text-align: center;
                  color: #282828;
                
                  .hearing-loc{
                    font-size: 18px;
                  }
              }
      
              .desc-body {
                  text-align: left;
                  color: #282828;
                  margin-top:25px;
                  font-size: 18px;
      
                  .bold {
                      font-weight: bold;
                  }
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

  getCaseDiaryDetail() {
    this._apolloService.get(`/judgement/details/${this.caseId}`).subscribe(data => {
      if (data.status == "success") {
        this.caseDiaryDetail = data.data;
      }
    })
  }
}
