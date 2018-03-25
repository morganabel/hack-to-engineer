import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsHomeComponent } from './problems-home.component';

describe('ProblemsHomeComponent', () => {
  let component: ProblemsHomeComponent;
  let fixture: ComponentFixture<ProblemsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
