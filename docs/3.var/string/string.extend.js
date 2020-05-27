
/**
 * 扩展
 *
 * isString
 *
 */

export function isString(v) {
  return toStr.call(value) === '[object String]';
  // return typeof v === 'string';
}
