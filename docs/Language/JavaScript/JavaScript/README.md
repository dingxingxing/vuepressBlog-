# JavaScript
## 一.什么是JavaScript

### 1、JavaScript历史

​	1995年，JavaScript诞生于网景公司一位Brenda Eich的工程师手上

​	1998年，ISO和IEC将ECMAScript采纳为标准（ISO/IEC-16262）。自此以后，各家浏览器均已ECMAScript作为自己JavaScripe实现的依据，虽然具体实现各有不同。



### 2、JavaScript实现

​	虽然JavaScript和ECMAScript基本上是同义词，但是JavaScript远远不限于ECMA-262所定义的那样。完整的JavaScript实现包含以下几个部分：

- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象（BOM）

#### 2.1、ECMAScript

​	ECMAScript，即ECMA-262定义的语言，并不局限于Web浏览器。事实上，这门语言没有输入和输出之类的方法。ECMA-262将这门语言作为一个基准来定义，以便在它之上再构建更稳健的脚本语言。Web浏览器只是ECMAScript实现可能存在的一种**宿主环境**。宿主环境提供ECMAScript的基准实现和与环境自身交互必须的扩展。扩展（比如DOM）使用ECMAScript核心类型和语法，提供特定于环境的 额外功能。其他宿主环境还有服务端JavaScript平台Node.js和即将被淘汰的Adobe Flash。

> 如果不涉及浏览器的话，ECMA-262到底定义了什么？在基本的层面，它描述这门语言的如下部分：
>
> - 语法
> - 类型
> - 语句
> - 关键字
> - 保留字
> - 操作符
> - 全局对象

​	ECMAScript只是对实现这个规范描述的所有方面的一门语言的称呼。JavaScript实现ECMAScript，而Adobe ActionScript同样也实现了ECMAScript。

> ECMA-262第6版本，俗称ES6、ES2015，发布于2015年6月。这一版包含了大概这个规范有史以来最重要的一批增强特性。
>
> .....
>
> ECMA-262第10版本，也称ES10、ES2019，发布于2019年6月。修订内容大家可网上自行查阅。
>
> ECMA-262第11版本，也称ES11、ES2020，发布于2020年6月。修订内容大家可网上自行查阅。

#### 2.2、DOM

​	**文档对象模型**（DOM）是一个应用编程接口(API)，用于在HTML中使用扩展的XML。DOM将整个页面抽象为一组分层节点。HTML或XML页面的每个组成部分都是一种节点，包含不同数据。

> DOM通过创建表示文档的树，让开发者可以随性所欲地控制网页的内容和结构。使用DOM API，可以轻松删除、添加、替换、修改节点。

①、为什么DOM是必需的

​	浏览器支持不同形态的动态HTML（DHTML）的情况下，开发者首先可以做到不刷新页面而修改页面外观和内容。这代表web技术的一个巨大进步，但也暴露了很大的问题。由于网景和微软采用不同思路开发DHTML，开发者写一个HTML页面就可以在任何浏览器中运行的好日子就此终结。

​	为了保持Web跨平台的本性，万维网联盟（W3C）开始制定DOM标准进程

#### 2.3、BOM

​	浏览器提供了**浏览器对象模型**（BOM）API，用于支持访问和操作浏览器的窗口。使用DOM，开发者可以操控浏览器显示页面之外的部分。而BOM真正独一无二的地方，当然也是问题最多的地方，就是它是唯一一个没有相关标准的JavaScript实现。

​	HTML5改变了这个局面，这个版本的HTML以正式规范的形式涵盖了尽可能多的BOM特性问题。



### 3、JavaScript的不同版本

> 多数浏览器对JavaScript的支持指的是实现ECMAScript和DOM的程度。



### 4、小结：

```js
JavaScript是一门用来与网页交互的脚本语言。
包含以下三个组成部分：

- ECMAScript：由ECMA-262定义并提供核心功能。
- 文档对象模型（DOM）：提供与网页内容交互的方法和接口。
- 浏览器对象模型（BOM）：提供与浏览器交互的方法和接口。
```

> JavaScript的这三个部分得到了五大浏览器（IE、FireFox、Chrome、Safari、Open）不同程度的支持。所有浏览器基本都对ES5（ECMAScript5）提供了完善的支持，而对ES6和ES7的支持度也在不断提升。浏览器对DOM的支持各部相同，但对Level3的支持日益趋于规范。HTML5中收录的BOM会因浏览器而异，不过开发者仍然可以假定存在很大一部分公共特性。