import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightOnSearch'
})
export class HighlightOnSearchPipe implements PipeTransform {

  transform(value: string, searchTerm: string): string {
    if (!searchTerm) {
      // If no search term, return the original value with any existing <marked> tags removed
      return value.replace(/<\/?marked>/g, '');
    }

    // Remove existing <marked> tags before applying new highlights
    const cleanValue = value.replace(/<\/?marked>/g, '');

    // Escape special characters in the search term
    searchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a case-insensitive regex pattern to match the search term
    const pattern = new RegExp(`${searchTerm}`, 'gi');

    // Apply the <marked> tags around the matching search term
    return cleanValue.replace(pattern, (match: string) => `<marked>${match}</marked>`);
  }

}
