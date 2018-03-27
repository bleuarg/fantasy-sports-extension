import addDays from 'date-fns/add_days';
import formatDate from 'date-fns/format';
import isSunday from 'date-fns/is_sunday';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import endOfWeek from 'date-fns/end_of_week';

export default function getWeekDates(startDate) {
    let dates = [];

    // if on sunday, start for following week too.
    const startOfWeek = isSunday(startDate) ? addDays(startDate, 1) : startDate;
    const endDate = endOfWeek(startOfWeek, { weekStartsOn: 1 });
    const days = differenceInCalendarDays(endDate, startDate) + 1;

    for (let i = 0; i < days; i++) {
      dates.push(formatDate(addDays(startDate, i), 'YYYY-MM-DD'));
    }

    return dates;
  }