import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let pattern = new RegExp(`${searchTerm}`, "gi");

    return value.replace(pattern, (match: any) => `<mark>${match}</mark>`);
  }
}
