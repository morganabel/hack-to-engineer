import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkItemDialogComponent } from './link-item-dialog.component';

describe('LinkItemDialogComponent', () => {
  let component: LinkItemDialogComponent;
  let fixture: ComponentFixture<LinkItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
