import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../graphql.operations';
import { ApolloService } from '../shared/services/apollo.service';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { imageUrl } from '../graphql.module';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {
  selectedProduct: string = '';
  productList: any;
  defaultProductLength = 20;
  serachProduct: string = '';
  filteredProduct: any = [];

  searchSubject = new Subject<string>();
  searchProductValue = '';

  @HostListener('window:resize', ['$event'])

  productsName = [
    { value: 'coat', viewValue: 'Coat' },
    { value: 'collarBand', viewValue: 'Collar Band' },
    { value: 'briefCase', viewValue: 'Briefcase' },
  ];

  carouselImagess = [
    {
      image: '../../assets/images/image/marketplace_img.png'
    },
    {
      image: '../../assets/images/image/marketplace1_img.png'
    }
  ];


  constructor(private router: Router, private apolloService: ApolloService, private toastMessage: ToastMessageService) {
    this.getProductsDataSource();
  }

  ngOnInit() {
    this.updateProductNameLength();
    this.searchSubject.pipe(debounceTime(300)).subscribe((search:any) => this.searchProduct(search));
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }
  

  onResize() {
    this.updateProductNameLength();
  }

  updateProductNameLength() {
    if (window.innerWidth < 600) {
      this.defaultProductLength = 30;
    } else if (window.innerWidth > 601 && window.innerWidth < 1023) {
      this.defaultProductLength = 20;
    } else if (window.innerWidth > 1023) {
      this.defaultProductLength = 20;
    }
  }

  searchProduct(search: string) {
    this.apolloService.mutate(GQLConfig.searchProduct, { search }).subscribe(data => {
      if (data.data.searchProduct.status === 200) {
        this.productList = data.data.searchProduct.data.data;
        this.toastMessage.success(data.data.searchProduct.message);
      } else {
        this.toastMessage.error(data?.data?.searchProduct?.message);
      }
    });
  }

  getImageUrl(image: any) {
    return imageUrl() + image;
  }

  getProductsDataSource() {
    this.apolloService.mutate(GQLConfig.getProductList).subscribe(data => {
      if (data.data != null) {
        if (data.data.getProductList.status == 200) {
          this.productList = data.data.getProductList.data.data;
          console.log('List', this.productList)
          this.toastMessage.success(data.data.getProductList.message);
        }
        else {
          this.toastMessage.error(data.data.getProductList.message);
        }
      }
    })
  }

  productDetail(detail: any) {
    this.router.navigate(['/lawyer/marketplace/productDetail'], { state: detail });
  }
}
