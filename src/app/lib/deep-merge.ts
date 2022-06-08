type PlainObject = Record<string, unknown>;

const isObject = (item: unknown): item is PlainObject =>
  Boolean(item) && typeof item === "object" && !Array.isArray(item);

const mergeInto = (target: PlainObject, source: PlainObject) => {
  for (const key in source) {
    const sourceValue = source[key];
    // Assign source value to target if source value is not an object.
    // Otherwise, merge recursively to keep every nested key.
    if (!isObject(sourceValue)) {
      target[key] = sourceValue;
    } else {
      const targetValue = target[key];
      const nested: PlainObject = isObject(targetValue) ? targetValue : {};
      target[key] = nested;
      mergeInto(nested, sourceValue);
    }
  }
};

/**
 * Deep merge two objects by overriding target with fields in source.
 * It returns a new object and doesn't modify any object in place since
 * it deep clones the target object first.
 */
export const deepMerge = <T extends object>(target: T, source: unknown): T => {
  const copyTarget = structuredClone(target);
  if (isObject(source)) mergeInto(copyTarget as PlainObject, source);
  return copyTarget;
};
