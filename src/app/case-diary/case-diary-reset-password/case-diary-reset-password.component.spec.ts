import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDiaryResetPasswordComponent } from './case-diary-reset-password.component';

describe('CaseDiaryResetPasswordComponent', () => {
  let component: CaseDiaryResetPasswordComponent;
  let fixture: ComponentFixture<CaseDiaryResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDiaryResetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseDiaryResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
