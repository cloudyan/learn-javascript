
/**
 * number-polyfill
 * 常用方法
 *
 * isFinite
 * isNaN
 * isInteger
 * isSafeInteger
 * isBigInt
 */

Number.isFinite = Number.isFinite || function(value) {
  return typeof value === "number" && isFinite(value);
}

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
         isFinite(value) &&
         Math.floor(value) === value;
};

Number.isNaN = Number.isNaN || function(value) {
  return typeof value === "number" && isNaN(value);
}

Number.isSafeInteger = Number.isSafeInteger || function (value) {
  return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
};


