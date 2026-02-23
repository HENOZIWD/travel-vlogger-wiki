export function safeParseJSON(str: string) {
  try {
    const result = JSON.parse(str);
    if (!result || typeof result !== 'object') return null;
    return result;
  }
  catch {
    return null;
  }
}
