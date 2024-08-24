import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
// see https://date-fns.org/v3.6.0/docs/format for formatting help
export class FormatDatePipe implements PipeTransform {
  transform(value: number, dateFormat: string): string {
    return format(new Date(value), dateFormat);
  }
}