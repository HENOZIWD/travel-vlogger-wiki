export function elapsedTime(timestamp: number) {
  const timeDiff = Math.floor((Date.now() - timestamp) / 1000);

  if (timeDiff < 60) return '방금 전';
  if (timeDiff < 60 * 60) return `${Math.floor(timeDiff / 60)}분 전`;
  if (timeDiff < 60 * 60 * 24) return `${Math.floor(timeDiff / (60 * 60))}시간 전`;
  return `${Math.floor(timeDiff / 60 * 60 * 24)}일 전`;
}
