export function isISO8601(value: string) {
  const isoDateTimeWithOptionalMilliseconds =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/;

  return (
    isoDateTimeWithOptionalMilliseconds.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}
