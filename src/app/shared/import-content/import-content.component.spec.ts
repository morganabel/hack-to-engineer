import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContentComponent } from './import-content.component';

describe('ImportContentComponent', () => {
  let component: ImportContentComponent;
  let fixture: ComponentFixture<ImportContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
