const RADIX = 1024,
  KB = RADIX,
  MB = KB * RADIX,
  GB = MB * RADIX;

export function prettyPrintBytes(n: number): string {
  if (n > GB) {
    return `${(n / GB).toFixed(2)} GiB`;
  } else if (n > MB) {
    return `${(n / MB).toFixed(2)} MiB`;
  } else if (n > KB) {
    return `${(n / KB).toFixed(2)} KiB`;
  } else {
    return `${n} bytes`;
  }
}
