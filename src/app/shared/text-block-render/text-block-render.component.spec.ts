import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBlockRenderComponent } from './text-block-render.component';

describe('TextBlockRenderComponent', () => {
  let component: TextBlockRenderComponent;
  let fixture: ComponentFixture<TextBlockRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextBlockRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBlockRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
