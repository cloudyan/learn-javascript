
// Async IIFE
(async () => {
  throw new Error('async IIFE'); // uncaught
})();

try {
  (() => {
    throw new Error('try...catch');
  })();
} catch (err) {
  console.log(err); // caught
}

try {
  (async () => {
    throw new Error('try...catch async'); // uncaught
  })();
} catch (err) {
  console.log(err)
}

// 改进方案
(async () => {
	throw new Error('async catch');
})().catch((err) => {
	console.log(err); // caught
});
// or
(async () => {
	try {
		throw new Error('async catch');
	} catch (err) {
		console.log(err); // caught
	}
})();

// async forEach
try {
  [1,2,3].forEach(async () => {
    throw new Error('forEach async'); // uncaught
  });
} catch (err) {
  console.warn(err)
}

// 改进方案
try {
  await Promise.all([1,2,3].map(async () => {
    throw new Error('Promise.all map');
  }));
} catch (err) {
  console.warn(err); // caught
}


// Early init
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

(async () => {
  try {
    const p1 = wait(3000).then(() => {throw new Error('err')}); // uncaught
    await wait(2000).then(() => {throw new Error('err2')});     // caught
    await p1;

    // 只有 await 会停止异步 Promise，解法是改用 await Promise all([]) 实现并行
  } catch (e) {
    console.log(e);
  }
})();

// 改进方案
await Promise.all([
  wait(1000).then(() => {throw new Error("err")}), // p1
  wait(2000),
]);
