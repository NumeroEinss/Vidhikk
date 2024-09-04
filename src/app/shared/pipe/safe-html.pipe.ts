import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML'
})
export class SafeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, ...args: unknown[]): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
