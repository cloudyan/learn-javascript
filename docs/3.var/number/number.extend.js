
/**
 * number 扩展
 *
 * isNumber
 * isFinite
 * isNaN
 * isInteger
 * isSafeInteger
 * isBigInt
 */

const objProto = Object.prototype;
const toString = objProto.toString;

export function isNumber(v) {
  return toString.call(v) === '[object Number]';
}

export function isFinite(v) {
  return typeof v === "number" && window.isFinite(v);
}

export function isInteger(v) {
  return !isNumber(v) || v % 1 === 0;
}

// export function isSafeInteger(v) {
//   return !isNumber(v) || v !== v;
// }

export function isNaN(v) {
  return !isNumber(v) || v !== v;
}

export function isActualNaN(v) {
  return v !== v;
}

let bigIntValueOf;
if (typeof BigInt === 'function') {
  bigIntValueOf = BigInt.prototype.valueOf;
}
export function isBigInt(v) {
  return typeof BigInt === 'function' && toStr.call(v) === '[object BigInt]' && typeof bigIntValueOf.call(v) === 'bigint';
}

// 有时采用一个更严格的方法来解析整型值很有用。此时可以使用正则表达式：
function filterInt(v) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(v))
    return Number(v);
  return NaN;
}
