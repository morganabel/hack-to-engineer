import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit {
  @Input() height: number = 30;
  @Input() language: string = "csharp";
  @ViewChild('editorContainer') private editorContainer: ElementRef;
  private editor: monaco.editor.IStandaloneCodeEditor;

  constructor(private clipboard: ClipboardService) { }

  submit() {
    console.log(this.editor.getValue());
  }

  copy() {
    this.clipboard.copyFromContent(this.editor.getValue());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      theme: "vs-dark",
      language: this.language
    });
  }

}
