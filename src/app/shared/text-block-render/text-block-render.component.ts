import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-text-block-render',
  templateUrl: './text-block-render.component.html',
  styleUrls: ['./text-block-render.component.scss']
})
export class TextBlockRenderComponent implements OnInit, AfterViewInit {
  @ViewChild('textBlock') textBlock: ElementRef;
  @Input() html: string;

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.highlightCode();
  }

  private highlightCode() {
    var codeBlocks = this.textBlock.nativeElement.querySelectorAll('pre');
    if (codeBlocks.length > 0) {
      codeBlocks.forEach((element: HTMLElement) => {
        Prism.highlightElement(element);
        
        this.insertScriptChangeButton(element);
      });
    }
  }  

  private insertScriptChangeButton(element: HTMLElement) {
    // Create html element to toggle script language.
    const newElement = this.renderer.createElement("mat-icon");
    this.renderer.addClass(newElement, "mat-icon");
    this.renderer.addClass(newElement, "material-icons");
    const elText = this.renderer.createText("layers");
    this.renderer.appendChild(newElement, elText);

    // Insert button in code block.
    this.renderer.insertBefore(element, newElement, element.firstChild);
  }
}
