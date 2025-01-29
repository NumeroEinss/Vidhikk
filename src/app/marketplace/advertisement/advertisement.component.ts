import { Component } from '@angular/core';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.scss'
})
export class AdvertisementComponent {
  files: any;
  fileUploaded: boolean = false;
  hasBanner: boolean = false;
  hasAd: boolean = false;
  previewBanners: any = [];
  updatedBanners: any = [];
  uploadType: string = 'slider';
  allowedDimensions = {
    slider: { width: 1210, height: 308 },
    ads: { width: 300, height: 600 },
  };
  userData: any;
  isBannerShow: boolean = true;
  isAdShow: boolean = false;
  bannerList: any = [];


  sellerList = [
    {
      image: '../../../assets/images/image/breifcase.png',
      status: 'pending',
    },
    {
      image: '../../../assets/images/image/coat.png',
      status: 'rejected',
    },
    {
      image: '../../../assets/images/image/coat1.png',
      status: 'approved',
    },
  ];

  constructor(private toastMessage: ToastMessageService, private apolloService: ApolloService) {
    this.userData = JSON.parse(sessionStorage.getItem('userData')!);
    this.getMarketPlaceBanner(this.uploadType);
  }

  toggleBanners(inputType: string) {
    this.isAdShow = false;
    this.isBannerShow = true;
    this.getMarketPlaceBanner(inputType);
  }

  toggleAds(inputType: string) {
    this.isAdShow = true;
    this.isBannerShow = false;
    this.getMarketPlaceBanner(inputType);
  }

  getMarketPlaceBanner(inputType: string) {
    let data = {
      inputType: inputType,
      addedBy: this.userData._id
    }

    this.apolloService.mutate(GQLConfig.getMarketPlaceBanner, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.getMarketPlaceBanner.status == 200) {
          this.bannerList = data.data.getMarketPlaceBanner.data
          console.log('List',  this.bannerList)
          this.toastMessage.success(data.data.getMarketPlaceBanner.message);
        }
        else {
          this.toastMessage.error(data.data.getMarketPlaceBanner.message);
        }
      }
    });
  }

  onUploadTypeChange(type: string) {
    this.uploadType = type;
    this.previewBanners = [];
    this.hasBanner = false;
  }

  onBannerSelected(event: any) {
    if (!this.uploadType) {
      this.toastMessage.error('Please select the type of banner (Front Banner or Side Ad) before uploading.');
    }
    else {
      const fileList = event.target.files;
      this.files = Array.from(fileList);
      // this.previewBanners = [];
      this.hasBanner = false;

      this.files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const image = new Image();
          image.src = e.target?.result as string;
          image.onload = () => {
            const dimensions = this.allowedDimensions[this.uploadType as keyof typeof this.allowedDimensions];
            const isValid = image.width === dimensions.width && image.height === dimensions.height;

            if (isValid) {
              this.previewBanners.push(image.src);
              this.hasBanner = true;
              this.fileUploaded = true;
            } else {
              this.toastMessage.error(
                `Invalid image dimensions for ${this.uploadType}. Required dimensions are: ${dimensions.width}x${dimensions.height}.`
              );
            }
          };
        };
        reader.readAsDataURL(file);
      });
    }
  }


  onUpdatedFileSelected(event: any) {
    const fileList = event.target.files;
    this.files = Array.from(fileList);

    this.files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updatedBanners.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  uploadBanners() {
    if (!this.fileUploaded) {
      this.toastMessage.error("Please add an image !!");
    }
    else {
      const mutation = {
        "query": "mutation ($input: marketPlaceBannersInput!, $files: [Upload!]) { marketPlaceBanner(input: $input, files: $files) { status message data } }",
        "variables": {
          "input": {
            "inputType": this.uploadType,
            "addedBy": this.userData._id,
          },
          "files": []
        }
      }

      this.apolloService.uploadMultiple(mutation, this.files).subscribe(objRes => {
        if (objRes.data != null) {
          this.toastMessage.success(objRes.data.marketPlaceBanner.message);
          this.previewBanners = [];
          this.fileUploaded = false;
          this.hasBanner = false;
        }
        else {
          this.toastMessage.error(objRes.data.marketPlaceBanner.message);
        }
      })
    }
  }

  removeBanner(index: number) {
    this.previewBanners.splice(index, 1)
  }

  removeLatestBanner(index: number) {
    this.updatedBanners.splice(index, 1)
  }


}
