# Reflect

```js
let a;
const obj = {a, b: undefined }

// ES5
console.log(
  ('a' in obj),
  ('b' in obj),
  ('c' in obj),
)

// ES6
console.log(
  Reflect.has(obj, 'a'),
  Reflect.has(obj, 'b'),
  Reflect.has(obj, 'c'),
)
```
