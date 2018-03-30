import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagMatchesComponent } from './tag-matches.component';

describe('TagMatchesComponent', () => {
  let component: TagMatchesComponent;
  let fixture: ComponentFixture<TagMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
