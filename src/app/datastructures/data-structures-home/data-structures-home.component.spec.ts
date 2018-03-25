import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStructuresHomeComponent } from './data-structures-home.component';

describe('DataStructuresHomeComponent', () => {
  let component: DataStructuresHomeComponent;
  let fixture: ComponentFixture<DataStructuresHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataStructuresHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStructuresHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
