// 仅用来测试扩展

import {
  isString,
} from './string.extend';

const str = 'abcdefghij';

test('isString', () => {
  str.isString('abc')).toBe(true);
})
