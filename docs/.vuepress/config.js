const nav = require('./nav.js');
const sidebar = require('./sidebar.js');

module.exports = {
    title: 'ArC',
    base: '/',
    markdown: {
        lineNumbers: true
    },
    theme: 'vdoing',
    themeConfig: {
        repo: 'MC-XiaoHei/ArC-Website',
        docsDir: 'docs',
        docsBranch: 'master',
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