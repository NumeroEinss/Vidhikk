import { Location } from '@angular/common';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { EncryptionService } from '../../shared/services/encryption.service';
import { GQLConfig } from '../../graphql.operations';

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
  caseLawDetail: any = { title: "", document: "" };
  userName: any;
  keyWord: any = "";
  routerState: any;
  memberList: any = [];
  title: string = "";

  constructor(private _location: Location, private _router: Router, private _encryptService: EncryptionService,
    private _toastMessage: ToastMessageService, private _apolloService: ApolloService) {
    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    this.userName = JSON.parse(localStorage.getItem('userData')!);
    if (this.routerState != undefined) {
      this.caseId = this.routerState.caseId || "";
      this.keyWord = this.routerState.keyWord || "";
      this.getCaseLawDetail();
      this.getMembersList();
    }
    else {
      this._router.navigate(['lawyer/case-law/cases']);
    }
  }

  routeBack() {
    this._location.back();
  }

  getMailtoLink() {
    const emailAddress = this.userName.email;
    const cc = '';
    const bcc = '';
    const subject = this.caseLawDetail.title;
    let divId = 'section-to-print'
    const divContent = document.getElementById(divId)?.innerHTML.replace(/<[^>]*>/g, '');
    return `mailto:${emailAddress}?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${divContent}`
  }

  async exportAsPDF(printableArea: string) {
    this._toastMessage.message('Pdf is downloading');
    let element = document.getElementById(printableArea) as HTMLElement;

    // html2canvas(element, { scale: 1 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/jpeg', 0.8); // Compress image
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   const margin = 10; // Define margin in mm
    //   const imgWidth = 210 - margin * 2; // A4 width in mm minus margin
    //   const pageHeight = 297 - margin * 2; // A4 height in mm minus margin
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   let heightLeft = canvas.height;
    //   let position = 0;
    //   let page = 0;
    //   while (heightLeft > 0) {
    //     const canvasPart = document.createElement('canvas');
    //     const context = canvasPart.getContext('2d');
    //     canvasPart.width = canvas.width;
    //     canvasPart.height = Math.min(pageHeight * canvas.width / imgWidth, heightLeft);
    //     if (context) {
    //       context.fillStyle = 'white';
    //       context.fillRect(0, 0, canvasPart.width, canvasPart.height);
    //       context.drawImage(canvas, 0, position, canvas.width, canvasPart.height, 0, 0, canvasPart.width, canvasPart.height);
    //       const imgDataPart = canvasPart.toDataURL('image/jpeg', 0.8);
    //       if (page > 0) {
    //         pdf.addPage();
    //       }
    //       pdf.addImage(imgDataPart, 'JPEG', margin, margin, imgWidth, (canvasPart.height * imgWidth) / canvasPart.width);
    //     }
    //     position += canvasPart.height;
    //     heightLeft -= canvasPart.height;
    //     page++;
    //   }
    //   pdf.save('file.pdf');
    // }).catch(error => {
    //   console.error('Error generating canvas:', error);
    // });


    if (typeof (window as any).html2pdf === 'undefined') {
      console.error('html2pdf.js is not loaded.');
    }
    else {
      const options = {
        margin: [8, 0, 5, 8], // Margins: top, left, bottom, right
        filename: `${this.caseLawDetail.title}.pdf`,
        image: { type: 'jpeg', quality: 0.5 },
        html2canvas: { scale: 1 }, // Adjust scale for better quality
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        mode: 'legacy',
        pagebreak: { mode: 'legacy' }
      };
      try {
        (window as any).html2pdf().from(element).set(options).save().then(() => {
          console.log('PDF generated and saved.');
        }).catch((error: any) => {
          console.error('Error generating PDF:', error);
        });
      } catch (error) {
        console.error('Error in PDF generation process:', error);
      }
    }
  }

  getBase64ImageFromUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL('image/svg+xml');
        resolve(dataURL);
      };
      img.onerror = error => reject('Failed to load image :' + error);
      img.src = url;
    });
  }

  print() {
    const content = this.printableContent.nativeElement.innerHTML;
    const printWindow = window.open('case-law/print', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
          <html>
            <head>
              <title>${this.getPrintTitle(this.caseLawDetail.title)}</title>
              <!-- Load Poppins font -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
              <style>
              @media print {
                html, body {
                  font-family: 'Poppins', sans-serif !important;
                }
                .logo {
                  width: 100%;
                  height: 65px;
                  text-align: center;
                  background-image: url("../../../../assets/images/icons/vidhiklogo.svg");
                  background-repeat: no-repeat;
                  background-position: center;
                }
                .header {
                  font-size: 16px;
                  font-weight: normal;
                  color: #8798ad;
                  text-align: center;
                }
                .highlighted-text {
                  font-size: 18px;
                  font-weight: 500;
                  color: #2E5BFF;
                  width: 100%;
                  margin-top: 38px;
                }
                .title {
                  font-size: 18px;
                  font-weight: bold;
                  color: black;
                  width: 100%;
                }
                .description {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  font-weight: normal;
                  line-height: 1.4;
                  margin-top: 30px;
                  font-size: 16px;
                }
                .desc-head {
                  max-width: 590px; 
                  text-align: center;
                  color: #282828;
                }
                .hearing-loc {
                  font-size: 18px;
                }
                .desc-body {
                  text-align: left;
                  color: #282828;
                  margin-top: 25px;
                  font-size: 18px;
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

  getCaseLawDetail() {
    this._apolloService.get(`/judgement/details/${this.caseId}`).subscribe(data => {
      if (data.status == "success") {
        this.caseLawDetail = data.data;
      }
    })
  }

  removeDocidAndLicense(input: string): string {
    // Define the regex pattern
    const combinedPattern = /<u> Docid # IndLawLib\/\d+<\/u>|<p style="text-align:center;margin-top:20px;margin-bottom:5px;font-size:120%;color:red;">.*?<\/p>/g;
    // Replace the matched pattern with an empty string
    return input.replace(combinedPattern, '');
  }

  getMembersList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    this._apolloService.mutate(GQLConfig.getMemberList, { lawyerId: parsedData._id }).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.getListMember.status == 200) {
          this.memberList = resObj.data.getListMember.data.memberList;
        }
        else {
          this._toastMessage.error(resObj.data.getListMember.message);
        }
      }
    })
  }

  share(member: any) { }

  getPrintTitle(title: any) {
    return title.replaceAll(' ', '_');
  }
}

