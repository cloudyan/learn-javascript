// 例子：替换一个字符串的子字符串
// 或使用 replace

function replaceString(oldS, newS, fullS){
  return fullS.split(oldS).join(newS);
}

// 使用 indexOf 统计一个字符串中某个字母出现的次数
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
