import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDiaryLoginComponent } from './case-diary-login.component';

describe('CaseDiaryLoginComponent', () => {
  let component: CaseDiaryLoginComponent;
  let fixture: ComponentFixture<CaseDiaryLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDiaryLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseDiaryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
