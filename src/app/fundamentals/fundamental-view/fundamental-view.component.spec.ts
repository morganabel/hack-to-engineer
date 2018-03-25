import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalViewComponent } from './fundamental-view.component';

describe('FundamentalViewComponent', () => {
  let component: FundamentalViewComponent;
  let fixture: ComponentFixture<FundamentalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundamentalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
