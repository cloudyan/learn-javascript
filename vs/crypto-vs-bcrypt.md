# Node Crypto vs Bcrypt

这两个库都提供加密和解密功能，但它们具有不同的功能和用例。

Node Crypto 是 Node.js 中的内置模块，提供各种加密功能，例如创建哈希、加密和解密数据、生成密钥等。它易于使用，并提供了广泛的加密和哈希算法。但是，如果您的项目对安全性或性能有特定要求，那么它可能不是最佳选择。

另一方面，Bcrypt 是一个专门从事密码哈希处理(密码散列和密钥派生函数 (KDF))的外部库。与 Node Crypto 相比，它提供了更好的安全功能，例如加盐和拉伸以防止暴力攻击。然而，这种增加的安全性是以性能为代价的。它使用一种名为 bcrypt 的独特算法，该算法设计得足够慢以防止暴力攻击，同时对合法用户保持足够快的速度。

参考：

- https://tradewise.community/node-crypto-vs-bcrypt-comparing-cryptographic-libraries-for-node-js/
