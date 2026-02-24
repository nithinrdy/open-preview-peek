export const tryJsonParse = <T>(str: string): T | null => {
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    console.error(`Failed to parse string '${str}' as JSON:`, e);
    return null;
  }
};
