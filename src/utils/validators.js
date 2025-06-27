export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
}

export function isValidMinutes(min) {
  const value = parseInt(min, 10);
  return !isNaN(value) && value > 0;
}
