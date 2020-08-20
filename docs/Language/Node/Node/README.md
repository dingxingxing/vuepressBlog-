# Node

## Node.js简介

### 				1.Node.js是什么

Node.js诞生于2009年，有Joyent的员工Ryan Dahl开发而成，目前官网最新版本已经更新到17.7.0版本，最新最稳定的是10.15.3。Node.js不是一门语言也不是框架，他只是具有GoogleV8引擎的JavaScript运行时环境，同时结合Libuv扩展了JavaScript功能，使之支持io、fs等只有语言才有的特性，使得JavaScript能够同时具体DOM操作（浏览器）和I/O、文件读写、操作数据库（服务端）等能力，是目前最简单的全栈语言。

这里我们可以简单理解Node.js是一个内置有chrome V8引擎的JavaScript运行环境，他可以使原本在浏览器中运行的JavaScript有能力跑后端，从而操作我们的数据库，进行文件读写等。

目前市场上高密的I/O模型，比如Web开发，微服务，前端构建等都有做Node.js的身影。不少大型网站都是使用Node.js作为后台开发语言，比如淘宝 双十一、去哪儿网的PC端核心业务。另外我们一些前端工具譬如VSCode，Webpack等也是有Node.js开发。

Node.js的包管理工具，npm已经成为世界开源包管理中最大的生态，功能强大，目前单月使用者接近1000万。

### 				2.Node.js特性（记住三句话）

- 事件驱动
- 非阻塞IO模型（异步）
- 轻量和高效