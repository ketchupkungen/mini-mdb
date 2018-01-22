import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })

export class TruncatePipe implements PipeTransform {
  transform(value: string, args: number) {

    if (!value) {
      return;
    }
    const arr = value.split(',');
    return arr.slice(0, args);
  }
}
