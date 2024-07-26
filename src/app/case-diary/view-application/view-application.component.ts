import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import { TemplateService } from '../../shared/services/template.service';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.scss',
})
export class ViewApplicationComponent {
  @ViewChild('printableContent') printableContent!: ElementRef;

  templateContent: any;
  caseDiaryId: string = "";
  applicationData: any;
  cityList: any = [];
  today: Date = new Date();

  constructor(private _router: Router, private _templateService: TemplateService, private _http: HttpClient,
    private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    let params = this._router.url.split('/');
    this.caseDiaryId = params[params.length - 1];
    this.getCityList();
    this.getApplicationDetail();
  }

  getCityList() {
    this._http.get('assets/JSON/cities.json').subscribe({
      next: (data) => {
        this.cityList = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getApplicationDetail() {
    this._apolloService.mutate(GQLConfig.getCaseDiaryDetail, { caseDiaryId: this.caseDiaryId }).subscribe(respObj => {
      if (respObj.data != null) {
        if (respObj.data.caseDiaryDetail.status == 200) {
          this.applicationData = respObj.data.caseDiaryDetail.data;
          this.onSelectTemplate(this.applicationData.applicationType);
        }
        else {
          this._toastMessage.error(respObj.data.caseDiaryDetail.message);
        }
      }
    })
  }

  backButton() {
    this._router.navigate([`lawyer/case-diary/cases`]);
  }

  exportAsPDF(printableArea: string) {
    // if (window.innerWidth > 1023) {
    //   let element = document.getElementById(printableArea) as HTMLElement;
    //   html2canvas(element).then(canvas => {
    //     const contentDataURL = canvas.toDataURL('image/png')
    //     let pdf = new jspdf('p', 'cm', 'a4');
    //     pdf.addImage(contentDataURL, 'PNG', 1, 1, 20, 17);
    //     pdf.save('Filename.pdf');
    //   });
    // }
    // else if (window.innerWidth < 1023) {
    //   let element = document.getElementById(printableArea) as HTMLElement;
    //   html2canvas(element, { scale: 1, width: 560, height: 800 }).then(canvas => {
    //     var imgData = canvas.toDataURL("image/jpeg");
    //     var pdf = new jspdf('p', 'cm', 'a4');
    //     pdf.addImage(imgData, 'JPEG', 1, 1, 17, 17);
    //     pdf.save("Test.pdf");
    //   });
    // }
    let applicationData = this.applicationData;
    let toastMessage = this._toastMessage;
    let doc = new jspdf('p', 'pt', 'letter');
    doc.html(this.printableContent.nativeElement, {
      callback: function () {
        doc.save(`${applicationData.caseName}.pdf`, { returnPromise: true }).then(
          () => {
            console.log("Pdf Saved Successfully !!");
          })
          .catch(error => { toastMessage.error(error) });
      }
    })
  }

  print() {
    const content = this.printableContent.nativeElement.innerHTML;
    const printWindow = window;
    if (printWindow) {
      // printWindow.document.open();
      // printWindow.document.write(`
      //   <html>
      //     <head>
      //       <title>Print</title>
      //       <style>
      //       @media print {
      //         body{
      //           font-size:18px;
      //           font-family: Poppins;
      //           font-stretch: normal;
      //           font-style: normal;
      //           line-height: normal;
      //           letter-spacing: normal;
      //         }

      //         .print-content{
      //           margin-top:15px
      //         }
      //           .bold {
      //             font-weight: bold;
      //           }
      //     }
      //       </style>
      //       </head>
      //       <body>
      //        ${content}
      //       </body>
      //    </html>
      //  `);
      // printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window.');
    }
  }

  onSelectTemplate(templateName: string): void {
    this._toastMessage.showLoader = true;
    this._templateService.getTemplate().subscribe({
      next: (data: any) => {
        this.templateContent = data.find((x: any) => x.application_type == templateName);
        this._toastMessage.showLoader = false;
      },
      error: (error: any) => {
        this._toastMessage.error(error);
        this._toastMessage.showLoader = false;
      }
    });
  }

  getState(city: any) {
    return this.cityList.find((x: any) => (x.name == city));
  }
}
