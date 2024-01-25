import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseDiaryComponent } from './create-case-diary.component';

describe('CreateCaseDiaryComponent', () => {
  let component: CreateCaseDiaryComponent;
  let fixture: ComponentFixture<CreateCaseDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCaseDiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCaseDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
