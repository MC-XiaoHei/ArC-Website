#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
npm run build # 生成静态文件
cd docs/.vuepress/dist # 进入生成的文件夹

# deploy to github
echo 'arc.xor7.tk' > CNAME
if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:MC-XiaoHei/ArC-Website.git
else
  msg='自动部署'
  githubUrl=https://MC-XiaoHei:${GITHUB_TOKEN}@github.com/MC-XiaoHei/ArC-Website.git
  git config --global user.name "MC-XiaoHei"
  git config --global user.email "xhwyx.tcloud@qq.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github

cd -
rm -rf docs/.vuepress/dist