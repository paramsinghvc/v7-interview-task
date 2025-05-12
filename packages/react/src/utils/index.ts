export function isUrl(str: string) {
  return str.startsWith('http');
}

export function getFileName(url: string) {
  return url.match(/[^/?#]+(?:\.[a-zA-Z0-9]+)(?=\?|$)/)?.[0];
}
