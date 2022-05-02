export const kilometersToMiles = (value: number) => {
  return value * 0.621371;
};
/**
 * Turns meters into prettified miles
 * Example:
 * 20.000 Meters -> 12 Miles
 * 3000 Meters -> 1.8 Miles
 * 800m -> 0.49 Miles
 * @param value Meter value
 */
export const prettifyMeters = (value: number) => {
  const kilometers = value / 1000;
  const miles = kilometersToMiles(kilometers);

  if (miles < 1) return miles.toFixed(2);
  if (miles <= 10) return miles.toFixed(1);
  if (miles > 10) return miles.toFixed(0);
  else return miles.toFixed(2);
};
