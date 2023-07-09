export const cut = (string: string, n: number): string => {
  if (string.length > n) {
    return string.slice(0, n - 3) + '...'
  }
  return string
}