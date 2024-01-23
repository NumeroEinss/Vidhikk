import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseLawListComponent } from './case-law-list.component';

describe('CaseLawListComponent', () => {
  let component: CaseLawListComponent;
  let fixture: ComponentFixture<CaseLawListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseLawListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseLawListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
