import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDiaryListComponent } from './case-diary-list.component';

describe('CaseDiaryListComponent', () => {
  let component: CaseDiaryListComponent;
  let fixture: ComponentFixture<CaseDiaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDiaryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseDiaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
