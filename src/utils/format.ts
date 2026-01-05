const formatter = new Intl.NumberFormat();

export function formatNumber(num: number) {
  return formatter.format(num);
}

export function elapsedTime(timestamp: number) {
  const timeDiff = Math.floor((Date.now() - timestamp) / 1000);

  if (timeDiff < 60) return '방금 전';
  if (timeDiff < 60 * 60) return `${Math.floor(timeDiff / 60)}분 전`;
  if (timeDiff < 60 * 60 * 24) return `${Math.floor(timeDiff / (60 * 60))}시간 전`;
  return `${Math.floor(timeDiff / 60 * 60 * 24)}일 전`;
}

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
