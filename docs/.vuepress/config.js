const nav = require('./nav.js');
const sidebar = require('./sidebar.js');

module.exports = {
    head: [
        ['link', { rel: 'icon', href: 'logo.webp' }],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
        ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
    ],
    title: 'ArC',
    base: '/',
    extendMarkdown(md) {
            md.set({ html: true });
            md.use(require("markdown-it-katex"));
        },
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