import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaseDiaryComponent } from './edit-case-diary.component';

describe('EditCaseDiaryComponent', () => {
  let component: EditCaseDiaryComponent;
  let fixture: ComponentFixture<EditCaseDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCaseDiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCaseDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
