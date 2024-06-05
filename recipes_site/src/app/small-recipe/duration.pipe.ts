import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '0 minutes';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let duration = ' ';
    if (hours) {
      duration += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes) {
      if (hours) {
        duration += ' and ';
      }
      duration += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return duration;
  }
}
