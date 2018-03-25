import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmsHomeComponent } from './algorithms-home.component';

describe('AlgorithmsHomeComponent', () => {
  let component: AlgorithmsHomeComponent;
  let fixture: ComponentFixture<AlgorithmsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
