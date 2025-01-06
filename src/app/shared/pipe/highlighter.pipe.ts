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

  transformOne(value: any, searchTerm: string) {
    if (!searchTerm.trim()) {
      return value;
    }
    // Escape special characters in the search term
    searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Create a RegExp object with global and case-insensitive flags
    const pattern = new RegExp(`(${searchTerm})`, 'g');
    // Return the value with the search term wrapped in <mark> tags
    return value.replace(pattern, (match: string) => `<mark>${match}</mark>`);
  }

  
}
