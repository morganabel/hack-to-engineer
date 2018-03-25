import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStructureViewComponent } from './data-structure-view.component';

describe('DataStructureViewComponent', () => {
  let component: DataStructureViewComponent;
  let fixture: ComponentFixture<DataStructureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataStructureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStructureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
