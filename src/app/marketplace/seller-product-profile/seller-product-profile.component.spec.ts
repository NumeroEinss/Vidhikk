import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductProfileComponent } from './seller-product-profile.component';

describe('SellerProductProfileComponent', () => {
  let component: SellerProductProfileComponent;
  let fixture: ComponentFixture<SellerProductProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProductProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
