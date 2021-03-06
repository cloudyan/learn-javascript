

// 正则表达式解析 url

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var a1 = `http://nodejs.cn/api/url.html#url_url_strings_and_url_objects`
var a2 = `http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash`

console.log(a1.match(parse_url))

// 1、捕获型分组：(...)
// 2、非捕获型分组：(?: .....)
// 3、向前正向匹配：(?=........)
// 4、向前负向匹配：(?!.........)

第一个分组

整个正则因子是匹配一个协议名：`http`

1. `^`表示字符串的开始
2. `(?: )`表示一个非捕获型分组：即在这个括号内的，但是不在其子括号内所匹配到的字符将不放入结果数组中。
3. `()`表示一个捕获型分组，此括号内所匹配到的字符放入结果数组中对应url中的: `http字符`
4. `[]`为正则表达式类，表示符合中括号内任一一个字符。
7. `A-Za-z`表示字母A到字母Z，字母a到字母z。`[A-Za-z]`表示符合字母A到字母Z，字母a到字母z的任一一个字符
5. `+`表示匹配1次货多次
6. `?`表示此组为可选匹配条件

第二个正则因子：

- `(\/{0,3})`://
    捕获型分组，\/表示一个应该被匹配的/，`{0,3}`表示\将被匹配0次或者1到3次之间
- `([0-9.\-A-Za-z]+)`:qiji123.kerlai.net
    捕获型分组，由一个或多个数字 ，“.”，”\-“(转义成”-“)，字母A到Z和字母a到z组成
- `(?::(\d+))?`：81
    前置：放在非捕获型分组中将不会出现在返回数组中，\d表示匹配数字。整个因子就是匹配前置为：后面跟随一个或多个数字。此分组因子为可选的
- `(?:\/([^?#]*))?`：GoodsBasic/Operate/12678
    该分组由/开始，^在此处表示非的意思，即除?#之外的所有字符 最后一个？表示此正则因子分组可选
- `(?:\?([^#]*))?` ：q
    该分组表示包含0个或多个非#字符
- `(?:#(.*))?`：simen
    该分组以#开始，(.)将匹配除结束符以外的所有字符。
- $表示这个字符串结束。

/**
 * http://nodejs.cn/api/url.html#url_url_strings_and_url_objects
 *
 * http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┴──────────┴──────────┴─────────────────────┤          │                │       │
│                       origin                            │ pathname │     search     │ hash  │
├─────────────────────────────────────────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

 */

// const url = require('url');

// export const URL = url.URL;
