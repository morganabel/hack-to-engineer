import { Pipe, PipeTransform } from '@angular/core';
import * as Fuse from 'fuse.js';

@Pipe({
  name: 'fuse'
})
export class FusePipe implements PipeTransform {
  defaults: Fuse.FuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  }

  transform(list: Array<Object>, query: string, options: Fuse.FuseOptions = {}): any {
    if (query && query.length > 0) {
      const searchOptions = Object.assign({}, this.defaults, options);
      const fuse = new Fuse(list, searchOptions);
      return fuse.search(query);
    } else {
      return list;
    }
  }
}
