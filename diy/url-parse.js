

// 正则表达式解析 url

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var a1 = `http://nodejs.cn/api/url.html#url_url_strings_and_url_objects`
var a2 = `http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash`

console.log(a1.match(parse_url))

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
