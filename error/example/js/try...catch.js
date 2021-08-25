// try...catch

// 处理同步错误


try {
  try {
    throw new Error("oops");
  }
  catch (err) {
    console.error("inner", err.message);
    // throw err; // 不使用 throw，外层 tryCatch 无法捕获错误
    // return;
  }
  finally {
    console.log("finally");
    // return; // finally 中使用 return 将不会把错误抛出到外层
  }
}
catch (err) {
  console.error("outer", err.message);
  // throw err; // 不使用 throw, 外层（全局的错误捕获）无法捕获此错误
}


// 在下面的代码中，try块的代码可能会抛出三种异常：TypeError，RangeError和EvalError。
// 当一个异常抛出时，控制将会进入与其对应的catch语句。如果这个异常不是特定的，那么控制将转移到无条件catch子句。
// TIP: 不要使用下面这个语法
// try {
//   myroutine(); // may throw three types of exceptions
// } catch (e if e instanceof TypeError) {
//   // statements to handle TypeError exceptions
// } catch (e if e instanceof RangeError) {
//   // statements to handle RangeError exceptions
// } catch (e if e instanceof EvalError) {
//   // statements to handle EvalError exceptions
// } catch (e) {
//   // statements to handle any unspecified exceptions
//   logMyErrors(e); // pass exception object to error handler
// }
