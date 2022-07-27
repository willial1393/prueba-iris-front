import * as moment from 'moment-timezone';

moment.locale('es');

export class DateUtils {
  static currentTimestamp(): string {
    return moment(new Date()).toISOString(true);
  }
}
