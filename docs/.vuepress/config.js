module.exports = {
  title: '小羽',
  description: '每割一次都要从割韭菜的人身上换回一点资源',
  head: [
    ['link', {
      rel: 'icon',
      href: `/favicon.ico`
    }],
    [
      "script", {
        "language": "javascript",
        "type": "text/javascript",
        "src": "/js/mouseClick.js"
      }
    ]
  ],
  dest: './docs/.vuepress/dist',
  ga: '',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'ECMAScript',
        items: [
          { text: 'ES6', link: '/ECMAScript/ES6/' },
          { text: 'ES7-10', link: '/ECMAScript/ES7-10/' },
          { text: 'JS随笔', link: '/ECMAScript/JSessay/' }
        ]
      },
      {
        text: 'Guide',
        items: [
          {
            text: 'Vue', link: '/Guide/Vue/Vue_mvvm/'
            // items: [
            //   { text: 'Vue_mvvm', link: '/Guide/Vue/Vue_mvvm/' },
            //   { text: 'Vuex', link: '/Guide/Vue/Vuex/' },
            // ]
          },
          { text: 'Git', link: '/Guide/Git/' },
          { text: 'Webpack', link: '/Guide/Webpack/' },
          { text: 'Axios', link: '/Guide/Axios/' },
        ]
      },
      {
        text: ' Contact',
        items: [
          { text: 'GitHub', link: 'https://github.com/dingxingxing' },
          { text: '博客园', link: 'https://www.cnblogs.com/dingxingxing' }
        ]
      },
    ],
    sidebarDepth: 3,
    sidebar: [
      {
        title: 'ECMAScript ',
        collapsable: true,
        children: ['/ECMAScript/ES6/', '/ECMAScript/ES7-10/', '/ECMAScript/JSessay/']
      },
      {
        title: 'Guide ',
        collapsable: true,
        children: ['/Guide/Git/', '/Guide/Webpack/', {
          title: 'Vue',
          children: ['/Guide/Vue/Vue_mvvm/', '/Guide/Vue/Vuex/', '/Guide/Vue/Vue_base/']
        }, '/Guide/Axios/']
      },
    ]
  }
}


