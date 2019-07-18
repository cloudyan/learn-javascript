# JavaScript 简介

JavaScript 是一种轻量级的脚本语言。所谓“脚本语言”，指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序的“脚本”。

关于 WebAssembly（wasm）

- 是一个可移植、体积小、加载快并且兼容 Web 的全新格式。
- 是 JavaScript 引擎的中间码格式，全部都是二进制代码。
- 由于跳过了编译步骤，可以达到接近原生二进制代码的运行速度。
- 各种语言（主要是 C 和 C++等）通过编译成 WebAssembly，就可以在浏览器里面运行（不仅仅是 web）。
- WebAssembly 运行在一个沙箱化的执行环境中，甚至可以在现有的 JavaScript 虚拟机中实现。
- WebAssembly 在 web 中被设计成无版本、特性可测试、向后兼容的。可以被 JavaScript 调用，进入 JavaScript 上下文，也可以像 Web API 一样调用浏览器的功能。

参考：

- https://wangdoc.com/javascript/basic/introduction.html
- http://webassembly.org.cn/
