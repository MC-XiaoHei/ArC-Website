const nav = require('./nav.js');
const sidebar = require('./sidebar.js');

module.exports = {
    title: 'ArC | Xor 7 Studio',
    base: '/arc-website/',
    markdown: {
        lineNumbers: true
    },
    theme: 'vdoing',
    themeConfig: {
        repo: 'MC-XiaoHei/arc-website',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '编辑此页面',
        nav,
        sidebar,
        sidebarDepth: 2,
        updateBar: {
            showToArticle: false
        },
        titleBadge: false,
        category: false,
        tag: false,
        archive: false,
        rightMenuBar: false
    }
}