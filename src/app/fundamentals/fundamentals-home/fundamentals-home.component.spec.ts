import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalsHomeComponent } from './fundamentals-home.component';

describe('FundamentalsHomeComponent', () => {
  let component: FundamentalsHomeComponent;
  let fixture: ComponentFixture<FundamentalsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundamentalsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentalsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
