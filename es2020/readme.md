# ES2020

- 链判断运算符 （optional chaining operator）`?.`



```js
// 错误的写法
const  firstName = message.body.user.firstName;

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

// 链判断运算符
const firstName = message?.body?.user?.firstName || 'default';
```
