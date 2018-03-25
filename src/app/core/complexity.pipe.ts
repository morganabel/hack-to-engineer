import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complexity'
})
export class ComplexityPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) return "";

    var output = "";
    var openItalics = false;
    var previousCharacter = "";
    for(var i = 0; i<value.length; i++) {
      const c = value.charAt(i);
      switch (this.getCharacterType(c)) {
        case 0:
          if (openItalics) {
            output += "</i>";
            openItalics = false;
          }

          if (this.isLetter(previousCharacter)) {
            output += `<sup>${c}</sup>`;
          } else {
            output += c;
          }
          
          break;
        case 1:
          if (openItalics) {
            output += "</i>";
            openItalics = false;
          }

          output += c;
          break;
        case 2:
          if (!openItalics) {
            output += "<i>";
            openItalics = true;
          }

          output += c;
          break;
      }

      previousCharacter = c;
    }

    return output;
  }

  private isLetter(c: string) {
    return /[a-zA-Z]/.test(c);
  }

  private isLogCharacter(c: string): boolean {
    return (c === 'l' || c === 'o' || c === 'g');
  }

  private getCharacterType(c: string): number {
    if (!isNaN(<any>c * 1)){
      return 0;
    }else{
        if (!this.isLetter(c) || c === c.toUpperCase() || this.isLogCharacter(c)) {
          return 1;
        }
        if (c == c.toLowerCase()) {
          return 2;
        }
    }
  }
}
