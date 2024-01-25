import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDiaryComponent } from './case-diary.component';

describe('CaseDairyComponent', () => {
  let component: CaseDiaryComponent;
  let fixture: ComponentFixture<CaseDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDiaryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CaseDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
