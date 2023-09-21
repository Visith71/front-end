export function getDaysBetweenDates(start, end, dayName) {
  var result = [];
  var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
  var day = days[dayName.toLowerCase().substr(0,3)];
  // Copy start date
  var current = new Date(start);
  // Shift to next of required days
  current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
  // While less than end date, add dates to result array
  while (current < end) {
    result.push(new Date(+current));
    current.setDate(current.getDate() + 7);
  }
  return result;  
}