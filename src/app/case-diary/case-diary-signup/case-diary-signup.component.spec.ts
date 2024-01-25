import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDiarySignupComponent } from './case-diary-signup.component';

describe('CaseDiarySignupComponent', () => {
  let component: CaseDiarySignupComponent;
  let fixture: ComponentFixture<CaseDiarySignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDiarySignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseDiarySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
