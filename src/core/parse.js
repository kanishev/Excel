export function parse(value = "") {
  if (value.startsWith("=")) {
    try {
      value = eval(value.slice(1));
      return value;
    } catch (e) {
      return value;
    }
  }
  return value;
}
