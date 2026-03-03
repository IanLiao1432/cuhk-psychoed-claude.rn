// export const insertStringAt = (
//   originalString: string,
//   stringToInsert: string,
//   position: number,
// ): string => {
//   return [
//     originalString.slice(0, position),
//     stringToInsert,
//     originalString.slice(position),
//   ].join('');
// };

export function normalizeText(s?: string): string {
  if (!s) return '';
  return s.replace(/\\n/g, '\n'); // convert literal backslash-n sequences to actual newline
}

export function divideString(
  target: string,
  separator: string = '|',
): string[] {
  return target
    .split(separator)
    .map(part => part.trim().replace(/^'(.*)'$/, '$1')); // Remove surrounding single quotes
}

export function safeJsonParse<T = unknown>(input: string): T {
  if (typeof input !== 'string') return input as unknown as T;

  // Replace control chars (U+0000 - U+001F) with escaped unicode sequences.
  const escapeControls = (s: string) =>
    s.replace(
      // eslint-disable-next-line no-control-regex
      /[\u0000-\u001F]/g,
      ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'),
    );

  // Primary attempt: escape controls to valid JSON escapes.
  try {
    const sanitized = escapeControls(input);
    return JSON.parse(sanitized) as T;
  } catch {
    // Secondary attempt: replace controls with a single space as a tolerant fallback.
    try {
      // eslint-disable-next-line no-control-regex
      const tolerant = input.replace(/[\u0000-\u001F]+/g, ' ');
      return JSON.parse(tolerant) as T;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      return {} as T;
    }
  }
}

export const generateHash = (content: string): string => {
  let hash = 0;
  for (const char of content) {
    hash = hash * 32 - hash + char.charCodeAt(0);
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Constrain to 32bit integer
  }
  return hash.toString();
};
