import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyQuestionsComponent } from './admin-modify-questions.component';

describe('AdminModifyQuestionsComponent', () => {
  let component: AdminModifyQuestionsComponent;
  let fixture: ComponentFixture<AdminModifyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifyQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModifyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
