import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { SearchComponentModel } from '@app/shared/search-component-model';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent extends SearchComponentModel  {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() title: string;

  hideTitle = false;

  searchButtonClick(event: any) {
    this.searchInput.nativeElement.focus();
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.onSelect.emit(event.option.value);
  }
}
