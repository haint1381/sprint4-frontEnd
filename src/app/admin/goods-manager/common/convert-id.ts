import { Pipe, PipeTransform } from '@angular/core';
@Pipe( {
  name: 'IdConvert'
} )
export class IdConvert implements PipeTransform {
  transform(value: number, unit: string): any {
    if (value) {
      if (unit === 'SP') {
        return 'SP-' + this.temp(value);
      } else if (unit === 'MS'){
        return 'MS-' + this.temp(value);
      }
    }
    return;
  }
  temp(value): any {
    if (value >= 1000) {
      return String(value);
    } else if (value >= 100) {
      return '0' + String(value);
    } else if (value >= 10) {
      return '00' + String(value);
    } else {
      return '000' + String(value);
    }
  }
}
