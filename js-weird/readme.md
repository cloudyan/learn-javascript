# 有趣的代码

```js
(Array(2).join(0)+3).slice(-2)
```

banana

```js
// banana

('b'+'a'+ +'a'+'a').toLocaleLowerCase()
// banana
```

vsinder

```js
// ship.js
let name = 'my friend'
Array(4).fill(1).forEach((item, index) => {
  console.log(`Merry christmas ${index == 3 ?
`dear ${name}` : 'to You'}`)
});
```

闭包

```js
(i =>
  (
    (
      f => {
        f(f, i)
      }
    )(
      (f, i) => {
        console.log("i:", i);
        if (i < 10) {
          f(f, i + 1);
        }
      }
    )
  )
)(1);
```

empty vs undefined

```js
(Array(2).join(0)+3).slice(-2)
```

```js
![] == false
[] == (![])
```

- https://github.com/aemkei/jsfuck

```js
false       =>  ![]
true        =>  !![]
undefined   =>  [][[]]
NaN         =>  +[![]]
0           =>  +[]
1           =>  +!+[]
2           =>  !+[]+!+[]
10          =>  +[[+!+[]]+[+[]]]
Array       =>  []
Number      =>  +[]
String      =>  []+[]
Boolean     =>  ![]
Function    =>  []["filter"]
run         =>  []["filter"]["constructor"]( CODE )()
eval        =>  []["filter"]["constructor"]("return eval")()( CODE )
window      =>  []["filter"]["constructor"]("return this")()
```
