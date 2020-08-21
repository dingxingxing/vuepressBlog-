# Reptiles爬虫
## cheerio

**简介:**

> cheerio是node.js的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种web爬虫程序。

**[cheerios官网](https://cheerio.js.org/)**

**爬取斗图啦网站图片例子**：

```js
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
// cheerio 获取HTML文档的内容，内容的获取跟jquery一样

// 起始地址-分析网站结构
let httpUrl = "https://www.doutula.com/article/list/?page=1";

// 获取页面总数
async function getNum() {
  res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  let btnLength = $('.pagination li').length
  let allNum = $('.pagination li').eq(btnLength - 2).find('a').text()
  console.log(allNum);
  return allNum
}

async function spider() {
  // 获取所有页面的总数
  let allPageNum = await getNum()
  for(let i=1;i<= 50;i++) {
    getListPage(i)
  }
}

async function getListPage(pageNum) {
  let httpUrl = "https://www.doutula.com/article/list/?page=" + pageNum;
  let res = await axios.get(httpUrl)
  // cheerio解析html文档
  let $ = cheerio.load(res.data)
  // 获取当前页面的所有的表情页面的链接
  $('#home .col-sm-9>a').each((i, element) => {
    let pageUrl = $(element).attr('href')
    let title = $(element).find('.random_title').text()
    let reg = /(.*?)\d/igs;
    title = reg.exec(title)[1]
    fs.mkdir(`./img/${title}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('成功创建目录：' + './img/' + title);
      }
    })
    parsePage(pageUrl, title)
  })
}

async function parsePage(url, title) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i, element) => {
    let imgUrl = $(element).attr('src')
    // 获取扩展名
    let extName = path.extname(imgUrl)
    // 图片写入的路径和名字
    let imgPath = `./img/${title}/${title}-${i}${extName}`
    // 创建图片可写流
    let ws = fs.createWriteStream(imgPath)
    axios.get(imgUrl, { responseType: 'stream' }).then(res => {
      // 通过管道流入到可写流的来源流
      res.data.pipe(ws)
      console.log('图片加载完成:', imgPath);
      // res.data.on('close',() => {
      //   ws.close()
      // })
    })
  })
}
spider()
```



**爬取音乐网站下载音乐:**

```js
// 目标：下载音乐
// 1获取音乐相关的信息，通过音乐相关的信息获取mp3地址
// 2如何获取大量的音乐信息，通过获取音乐列表
// 3通过音乐的分类页，获取音乐列表

const axios = require('axios')
const fs = require('fs')
const path = require('path')

// 获取音乐
async function getPage(num) {
  let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page=" + num
  let res = await axios.get(httpUrl)

  res.data.list.forEach((item, i) => {
    let title = item.sound.name
    let mp3Url = item.sound.source
    let filename = path.parse(mp3Url).name

    let content = `${title},${mp3Url},${filename}\n`
    fs.writeFile('music.txt', content, {flag:'a'},() => {
      console.log('写入完成：'+ title);
    })
    // console.log(title);
    // console.log(mp3Url);
    download(mp3Url,filename)
  })
}

// 下载音乐
async function download(mp3Url, filename) {
  let res = await axios.get(mp3Url, { responseType: "stream" })
  // 创建可写流
  let ws = fs.createWriteStream('./mp3/' + filename + '.mp3')
  // 通过管道流入到可写流的来源流
  res.data.pipe(ws)
  // res.data.on('close',() => {
  //   ws.close()
  // })
}

for(i=1;i<=5; i++) {
  getPage(i)
}

```

## Puppeteer

**出现的背景**

Chrome59(linux、macos)、Chrome60(windows)之后，Chrome自带headless(无界面)模式很方便做自动化测试或者爬虫。但是如何和headless模式的Chrome交互则是一个问题。通过启动Chrome时的命令参行参仅能实现简易的启动时初始化操作。Selenium、Webdriver等是一种解决方案，但是往往依赖众多，不够扁平。

Puppteer是谷歌官方出品的一个通过DevTools协议控制headless Chrome的库。通过Puppeteer的提供api直接控制Chrome模拟大部分用户操作来进行UI Test或者作为爬虫访问页面来收集数据。

**作用：**

- 生成页面的屏幕截图和PDF。
- 爬取SPA（单页应用程序）并生成预渲染的内容（即“ SSR”（服务器端渲染））。
- 自动化表单提交，UI测试，键盘输入等。
- 创建最新的自动化测试环境。使用最新的JavaScript和浏览器功能，直接在最新版本的Chrome中运行测试。
- 捕获站点的[时间线跟踪](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)以帮助诊断性能问题。
- 测试Chrome扩展程序。

### 使用和例子

Puppeteer类似其他框架，通过操作Browser实例来操作浏览器做出相应的反应。

```js
const puppeteer = require('puppeteer')

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.to('http://rennaiqian.com');
    await page.screenshot({path:'example.png'});
    await page.pdf({path:'example.pdf',format:'A4'});
    await browser.close()
})()
```

上述代码通过puppeteer的launch方法生成了一个browser的实例，对应于浏览器，launch方法可以传入配置选项，比较有用的是在本地调试时传入`{headless:false}`可以关闭headless模式。

```js
const browser = await puppeteer.launch({headless: false})
```

browser.newPage方法可以打开一个新选项卡并返回选项卡的实例page，通过page上的各种方法可以对页面进行常用操作。上述代码就进行了截屏和打印pdf的操作。



## 爬虫总结

### 1.爬虫介绍

通过模拟浏览器的请求，服务器根据我们的请求返回我们想要的数据，将数据解析出来，并且进行保存

### 2.爬虫流程

#### 	1-目标：确定你想要获取的数据

1. 确定想要的数据在什么页面

2. 确定在哪些页面可以链接到这些页面

3. 寻找页面之间和数据之间的规律

   

   #### 2-分析页面

4. 获取数据的方法（正则，cherrio）

5. 分析数据是通过ajax请求的数据，还是html里自带的数据

6. 如果是通过AjAX请求的数据，那么需要获取ajax请求的链接，一般请求到的数据都为JSON格式数据，那么就容易解析

7. 如果数据在HTML里面，那么就用cherrio通过选择器将内容选中

   

   #### 3-编写单个数据获取的案例

8. 解析出分类页的链接地址

9. 解析出列表页的链接地址

10. 解析出详情页的链接地址

11. 解析详情页里面想要获取的数据

12. 将数据进行保存到本地或者是数据库

    

    #### 4-如果遇到阻碍进行反爬虫对抗

13. User-Agent是否是正常浏览器的信息

14. 将请求头设置成跟浏览器一样的内容

15. 因为爬虫的爬取速度过快，会导致封ip。1那么可以降低速度进行解决，2可以使用代理进行解决

16. 如果设置需要凭证，那么可以采用无界面浏览器真实模拟。



### 3.请求数据的库

request，axiso：通过库，帮助我们快速实现HTTP请求包的打包

```js
request.get('请求地址', {
   '请求头字段':'请求头的value值'         
},(res) => { 处理返回的内容 })
```

axios优势会更明显，前后端通杀，前后端调用方式一致

```js
axios.get('请求地址', 参数对象).then((res) => {
    console.log(res)
})
```

axios获取图片

```js
axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3ny',
    responseType: 'stream'
})
.then((res) => {
    res.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
```

**puppeteer：完全模拟浏览器**

打开浏览器

```js
let options = {
    headless: true, // 是否是无界面浏览器
    slowMo: 250, // 调试时可以减慢操作速度
    defaultViewport: { //设置视宽的宽高
        width: 1200
        height: 800
    },
    timeout: 3000, // 默认超时时间3秒
}
let browser = await puppeteer.launch(options)
```

打开新标签页

```js
let page = await borwser.newPage()
```

获取所有浏览器中的页面

```js
let page = await browser.pages()
```

关闭浏览器

```js
borwser.close()
```

将页面跳转至

```js
await page.goto(url)
```

获取页面的对象并进行操作

```js
let btn = await page.$(selector)
let input = await page.$(selector)
// 点击按钮
btn.click()
// 聚焦到输入框
input.forcus()
```

在页面上写入内容或者键盘按键

```js
await page.keyboard.type('hello World!');
await page.keyboard.press('ArrowLeft');
await page.keyboard.down('Shift');
```

截获页面请求

```js
await page.setRequestInterception(true)
page.on('request', request => {
    // request 包含请求的所有信息
    if(你想要的条件) {
        request.continue()
    } else {
        request.respond({
        	status: 404,
        	contentType: 'text/plain',
        	body: 'Not Found!'
    	})
    }
})
```

获取浏览器的信息和内容

```js
page.$eval(selector, (item) => { return item })
page.$$eval(selector, (item) => { return item })
```

 ## Demo

 **GitHub上有：[MongoDB数据库+Node爬虫-案例demo](https://github.com/dingxingxing/MongoDB-ReptilesDemo)，欢迎Clone学习**
 
 **更多爬虫相关小案例，欢迎进入[github选择"爬虫-Reptiles爬虫"文件夹](https://github.com/dingxingxing/Storage-of-record-documents)查看clone**
