# DOM && BOM

- `DOM` (Document Object Model): 文档对象模型，是 W3C 的标准(所有浏览器公共遵守的标准) HTML和XML文档的编程接口。
- `BOM` (Browser Object Model): 浏览器对象模型，没有相关标准，是各个浏览器厂商各自实现的(表现为不同浏览器定义有差别，实现方式不同)，如 window、location、navigator、screen、history等对象


DOM（文档对象模型）是 HTML 和 XML 的应用程序接口（API）。

document 是DOM中的核心对象，window 是 BOM 对象，而非 js 对象

javacsript 是通过访问 BOM 对象来访问、控制、修改客户端(浏览器)，由于BOM的window引用了 document，window对象的属性和方法是直接可以使用而且被感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM模型的根节点。可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。其中 DOM包含：window

Window对象包含属性：document、location、navigator、screen、history、frames Document根节点包含子节点：forms、location、anchors、images、links

从window.document已然可以看出，DOM的最根本的对象是BOM的window对象的子对象。

区别：DOM描述了处理网页内容的方法和接口，BOM描述了与浏览器进行交互的方法和接口。

**DOM 事件模型的根节点是 window。**

