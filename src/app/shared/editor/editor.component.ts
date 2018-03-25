import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeService } from '@app/core/code/code.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() data: any;
  @Input() dataKey: string;
  @Output() onSave = new EventEmitter<any>();
  @select(['auth', 'editMode']) editMode$: Observable<boolean>; 
  loading = false;
  codeEditorInit = false;
  showCodeEditor = false;
  editor: any;
  editorSettings = {
    skin_url: '/assets/skins/lightgray',
    extended_valid_elements: "pre[id|accesskey|class|dir|lang|style|tabindex|title|role|width|code-block-id]",
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code codesample fullscreen',
      'insertdatetime media table contextmenu paste template'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codesample template link image'
  };

  constructor(private codeService: CodeService) { }

  ngOnInit() {
  }

  onDirty(event: any) {
    this.editor = event.editor;
  }

  resetEditor(event: any) {
    this.editor = undefined;
  }

  save(event: any) {
    this.loading = true;
    var output = {};
    var htmlContent = this.editor.getContent();

    this.codeService.findAndEnhanceCodeBlocks(htmlContent)
      .then((html) => {
        output[this.dataKey] = html;
        this.onSave.emit(output);
      }).then(() => {
        this.loading = false;
      });
  }

  toggleCodeEditor(event: any) {
    this.codeEditorInit = true;
    this.showCodeEditor = !this.showCodeEditor;
  }
}
