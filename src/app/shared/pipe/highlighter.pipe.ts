import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, searchTerm: string): unknown {
    // if (!searchTerm) {
    //   return value;
    // }

    // const regex = new RegExp(`(${searchTerm})`, 'gi');
    // let val = value.replaceAll(searchTerm, `<span class="highlighted-text">${searchTerm}</span>`);
    // return val;
    searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let pattern = new RegExp(`${searchTerm}`, "gi");

    let val = value.replace(pattern, (match: any) => `<mark>${match}</mark>`);

    return val
  }

}
