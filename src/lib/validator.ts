/**
 * Checks if a value has value and is not null or undefined.
 */
export const isDefined = <T>(
  value: T | null | undefined
): value is NonNullable<T> => value !== undefined && value !== null;
