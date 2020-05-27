

test('isFinite', () => {
  expect(Number.isFinite(Infinity)).toBe(false);
  expect(Number.isFinite(NaN)).toBe(false);
  expect(Number.isFinite(-Infinity)).toBe(false);

  expect(Number.isFinite(0)).toBe(true);
  expect(Number.isFinite(2e64)).toBe(true);

  expect(Number.isFinite('0')).toBe(false);
  expect(isFinite('0')).toBe(true);
})

test('isNaN', () => {
  Number.isNaN(NaN);        // true
  Number.isNaN(Number.NaN); // true
  Number.isNaN(0 / 0)       // true

  // 下面这几个如果使用全局的 isNaN() 时，会返回 true。
  Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
  Number.isNaN(undefined);  // false
  Number.isNaN({});         // false
  Number.isNaN("blabla");   // false

  // 下面的都返回 false
  Number.isNaN(true);
  Number.isNaN(null);
  Number.isNaN(37);
  Number.isNaN("37");
  Number.isNaN("37.37");
  Number.isNaN("");
  Number.isNaN(" ");
  expect(Number.isNaN(NaN)).toBe(true);
  expect(Number.isNaN(2)).toBe(false);
})

test('isInteger', () => {
  Number.isInteger(0);         // true
  Number.isInteger(1);         // true
  Number.isInteger(-100000);   // true

  Number.isInteger(0.1);       // false
  Number.isInteger(Math.PI);   // false

  Number.isInteger(Infinity);  // false
  Number.isInteger(-Infinity); // false
  Number.isInteger("10");      // false
  Number.isInteger(true);      // false
  Number.isInteger(false);     // false
  Number.isInteger([1]);       // false
})

test('isSafeInteger', () => {
  Number.isSafeInteger(3);                    // true
  Number.isSafeInteger(Math.pow(2, 53))       // false
  Number.isSafeInteger(Math.pow(2, 53) - 1)   // true
  Number.isSafeInteger(NaN);                  // false
  Number.isSafeInteger(Infinity);             // false
  Number.isSafeInteger("3");                  // false
  Number.isSafeInteger(3.1);                  // false
  Number.isSafeInteger(3.0);                  // true
})

test('toFixed', () => {
  const num = 12345.6789;
  expect(num.toFixed()).toBe('12346');
  expect(num.toFixed(1)).toBe('12345.7');
  expect(num.toFixed(6)).toBe('12345.678900');
  expect((1.23e+20).toFixed(2)).toBe('123000000000000000000.00');
  expect((1.23e-10).toFixed(2)).toBe('0.00');
  expect(2.34.toFixed(1)).toBe('2.3');
  expect(-2.34.toFixed(1)).toBe(-2.3);
  expect((-2.34).toFixed(1)).toBe('-2.3');

  // RangeError: toFixed() digits argument must be between 0 and 100
  // expect(num.toFixed(-1)).toBe('');
})

test('parseInt', () => {
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  // 这个有很多列子
})
