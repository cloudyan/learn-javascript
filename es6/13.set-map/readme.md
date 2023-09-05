# Set && Map

- set 是一种存储唯一值的集合。类似数组，每个元素都是唯一的（支持任意类型）
  - set: add, has, delete, clear, size
  - 适用于需要存储一组唯一值，且不关心顺序的场景，如去重、检查值是否存在等
- map 是一种键值对的集合。类似对象，每个键名是唯一的（支持更多类型）
  - map: set, get, has, delete, clear, size
  - 适用于存储键值对，且需要根据键名进行查找和操作的场景，如存储键值对、缓存数据等

## 几个问题

- 区别 [Map vs Object](../../vs/map-vs-object.md)

## 相关 API

- 使用场景
- 区别
  - Set vs Array
  - Set vs WeakSet
  - Map vs Object vs Hash
  - Map vs WeakMap
- Set
  - add
    - 5 or '5'
    - NaN
    - {}
  - has
  - delete
  - clear
  - size
  - Set 结构的键名就是键值（两者是同一个值）
  - 扩展运算符（...）内部使用 for...of 循环，所以也可以用于 Set 结构。
  - 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）
- WeakSet
  - add
  - delete
  - has
  - WeakSet 的成员只能是对象，而不能是其他类型的值。
  - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
  - WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
- Map
  - set
  - get
  - has
  - delete
  - clear
  - size
  - Map 构造函数接受数组作为参数，实际上执行的是下面的算法。
  - 与其他数据结构的互相转换
    - Map 转为数组
    - 数组 转为 Map
    - Map 转为对象
    - 对象转为 Map
    - Map 转为 JSON
    - JSON 转为 Map
- WeakMap
  - WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名。
  - WeakMap 的键名所指向的对象，不计入垃圾回收机制。
  - WeakMap 的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap 结构有助于防止内存泄漏。
  - WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
  - 用途
    - DOM 节点作为键名（典型场合）
    - 部署私有属性

去重

```js
function dedupe(array) {
  // return Array.from(new Set(array));
  return [...new Set(array)];
}
```

并集 交集 差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x)));
// Set {1}
```

```js
const map = new Map([
  ["name", "张三"],
  ["title", "Author"],
]);

map.size; // 2
map.has("name"); // true
map.get("name"); // "张三"
map.has("title"); // true
map.get("title"); // "Author"

// Map构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
  ["name", "张三"],
  ["title", "Author"],
];

const map = new Map();

items.forEach(([key, value]) => map.set(key, value));
```

```js
// DOM 节点作为键名
let myWeakmap = new WeakMap();

myWeakmap.set(document.getElementById("logo"), { timesClicked: 0 });

document.getElementById("logo").addEventListener(
  "click",
  function () {
    let logoData = myWeakmap.get(document.getElementById("logo"));
    logoData.timesClicked++;
  },
  false
);

// 部署私有属性
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log("DONE"));

c.dec();
c.dec();
// DONE
```

Countdown 类的两个内部属性\_counter 和\_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

## 数据结构的互相转换

- Map 转为数组

  ```js
  const myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
  [...myMap];
  // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
  ```

- 数组 转为 Map

  ```js
  new Map([
    [true, 7],
    [{ foo: 3 }, ["abc"]],
  ]);
  // Map {
  //   true => 7,
  //   Object {foo: 3} => ['abc']
  // }
  ```

- Map 转为对象

  如果所有 Map 的键都是字符串，它可以无损地转为对象。

  ```js
  function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  const myMap = new Map().set("yes", true).set("no", false);
  strMapToObj(myMap);
  // { yes: true, no: false }
  ```

  如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

- 对象转为 Map

  ```js
  let obj = { a: 1, b: 2 };
  let map = new Map(Object.entries(obj));

  // 自己实现
  function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  objToStrMap({ yes: true, no: false });
  // Map {"yes" => true, "no" => false}
  ```

- Map 转为 JSON

  ```js
  // 1. 键名都是字符串，这时可以选择转为对象 JSON。
  function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
  }

  let myMap = new Map().set("yes", true).set("no", false);
  strMapToJson(myMap);
  // '{"yes":true,"no":false}'

  // 2. Map 的键名有非字符串，这时可以选择转为数组 JSON。
  function mapToArrayJson(map) {
    return JSON.stringify([...map]);
  }

  let myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
  mapToArrayJson(myMap);
  // '[[true,7],[{"foo":3},["abc"]]]'
  ```

- JSON 转为 Map

  ```js
  // 所有键名都是字符串
  function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
  }

  jsonToStrMap('{"yes": true, "no": false}');
  // Map {'yes' => true, 'no' => false}

  // 特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。
  // 这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作
  function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
  }

  jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
  // Map {true => 7, Object {foo: 3} => ['abc']}
  ```
