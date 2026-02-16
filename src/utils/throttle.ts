export function throttle<T extends (...args: Parameters<T>) => void>(
  callbackFn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>) => {
    if (timer) return;

    callbackFn(...args);

    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}
