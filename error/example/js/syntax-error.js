// 语法错误是无法被捕获的，
// throw 后可以捕获
try {
  eval('hoo bar');
} catch (err) {
  console.log(err instanceof SyntaxError); // true
  console.log(err);                        // SyntaxError: Unexpected identifier at http://localhost:5000/js/syntax-error.js:3:3
  console.log(err.message);                // "Unexpected identifier"
  console.log(err.name);                   // "SyntaxError"
  console.log(err.fileName);               // undefined
  console.log(err.lineNumber);             // undefined
  console.log(err.columnNumber);           // undefined
  console.log(err.stack);                  // "SyntaxError: Unexpected identifier\n    at http://localhost:5000/js/syntax-error.js:3:3"
  throw err; // intentionally re-throw (caught by window.onerror)
}
