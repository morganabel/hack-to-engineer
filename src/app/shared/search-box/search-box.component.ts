import { Component } from '@angular/core';
import { SearchComponentModel } from '@app/shared/search-component-model';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends SearchComponentModel {
  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.form.controls.query.disable();
    this.onSelect.emit(event.option.value);
  }
}
