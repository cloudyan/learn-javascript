// Object.is

Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});

// 与严格比较运算符（===）的不同
// +0 === -0 //true
// NaN === NaN // false

// Object.is(+0, -0) // false
// Object.is(NaN, NaN) // true
