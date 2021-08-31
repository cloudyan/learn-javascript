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


// Javascript引擎首先读代码，然后运行。
// 发生在读阶段错误称为“解析时”错误，不可恢复，因为引擎不理解代码。
// 所以，try...catch 仅能处理有效代码中的错误，被称为“运行时”错误，有时也称为“异常”。
try {
  xxx // 运行时错误(必须是有效的Javascript代码)，tryCatch 仅能处理有效代码中的错误，被称为“运行时”错误
} catch (err) {
  console.log('语法错误', err);
  // throw err;
}

// try...catch 只能捕获同步错误，如 setTimeout 就无法捕获
// 无法捕获的，就会被全局捕获
try {
  setTimeout(function() {
    noSuchVariable; // script will die here
  }, 10);
} catch (e) {
  console.log(`won't work`);
}

// 解析时错误，不能被 tryCatch 处理，
// 此类错误直接导致代码执行中断，比较严重
//   此错误会影响前面的 tryCatch 执行
//   该错误会被 window.onerror 捕获到
// try {
//   {{{
// } catch (err) {
//   console.log('语法错误', err);
// }

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
