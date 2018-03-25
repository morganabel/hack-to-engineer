import { Component, OnInit } from '@angular/core';
import { NewItemComponent } from '@app/shared/new-item/new-item.component';
import { FormGroup, Validators } from '@angular/forms';
import { TagType } from '@app/tags/tag-type.enum';

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.scss']
})
export class NewTagComponent extends NewItemComponent {
  tagTypeEnum: Array<{ key: string, value: string }>;

  ngOnInit() {
    super.ngOnInit();

    const tagTypeKeys = Object.keys(TagType);
    this.tagTypeEnum = tagTypeKeys.map(key => {
      return { key: key, value: TagType[key] };
    })
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      tagType: ['', Validators.required]
    })
  }

  createDocFromForm(formGroup: FormGroup) {
    return {
      name: this.form.controls.name.value,
      tagType: this.form.controls.tagType.value,
      order: Date.now()
    }
  }
}
