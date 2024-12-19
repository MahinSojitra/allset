import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number): string {
    if (!value) return 'Unknown';

    const currentTime = new Date().getTime();
    const pastTime = new Date(value).getTime();
    const diffInSeconds = Math.floor((currentTime - pastTime) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const interval in intervals) {
      const count = Math.floor(diffInSeconds / intervals[interval]);
      if (count > 0) {
        return count === 1
          ? `1 ${interval} ago`
          : `${count} ${interval}s ago`;
      }
    }

    return 'Just now';
  }
}
