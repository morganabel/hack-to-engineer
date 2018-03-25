import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {
  @Input() enabled = false;
  @Input() text: string;
  @Input() key: string;
  @Output() onSave = new EventEmitter<any>();
  editText: string;
  showEditor: boolean = false;
  showEditButton: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  onMouseEnter() {
    this.showEditButton = true;
  }

  onMouseLeave() {
    this.showEditButton = false;
  }

  start(event: any) {
    this.editText = this.text;
    this.showEditor = true;
  }

  cancel(event: any) {
    this.showEditor = false;
  }

  save(event: any) {
    var output = {};
    output[this.key] = this.editText;
    this.onSave.emit(output);
    this.showEditor = false;
  }
}
