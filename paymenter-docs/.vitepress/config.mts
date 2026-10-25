import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'VMAUB CLOUD 服务与政策',
  description: 'VMAUB CLOUD 云服务的服务条款、隐私政策、退款政策、禁止行为及服务终止规则。',
  cleanUrls: true,
  srcExclude: ['README.md'],
  head: [
    ['meta', { name: 'theme-color', content: '#254a73' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  themeConfig: {
    siteTitle: 'VMAUB CLOUD · 服务与政策',
    nav: [
      { text: '服务条款', link: '/terms' },
      { text: '隐私政策', link: '/privacy' },
      { text: '返回用户中心', link: 'https://vmaub.com/dashboard' }
    ],
    sidebar: [
      {
        text: '服务规则',
        items: [
          { text: '阅读指引', link: '/' },
          { text: '服务条款', link: '/terms' },
          { text: '隐私政策', link: '/privacy' },
          { text: '退款政策', link: '/refund' },
          { text: '禁止行为', link: '/acceptable-use' },
          { text: '服务终止', link: '/termination' }
        ]
      }
    ],
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '政策目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '切换外观',
    lightModeSwitchTitle: '切换浅色模式',
    darkModeSwitchTitle: '切换深色模式',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索政策', buttonAriaLabel: '搜索服务政策' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清空搜索',
                backButtonTitle: '返回',
                noResultsText: '没有找到相关内容',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },
    footer: {
      message: '服务网站：<a href="https://vmaub.com">vmaub.com</a> · 联系渠道：<a href="https://vmaub.com/tickets">站内工单</a>',
      copyright: 'VMAUB CLOUD 服务与政策'
    }
  }
})
