import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDiaryForgotComponent } from './case-diary-forgot.component';

describe('CaseDiaryForgotComponent', () => {
  let component: CaseDiaryForgotComponent;
  let fixture: ComponentFixture<CaseDiaryForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDiaryForgotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseDiaryForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
