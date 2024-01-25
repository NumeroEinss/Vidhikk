import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseLawDetailComponent } from './case-law-detail.component';

describe('CaseLawDetailComponent', () => {
  let component: CaseLawDetailComponent;
  let fixture: ComponentFixture<CaseLawDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseLawDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseLawDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
