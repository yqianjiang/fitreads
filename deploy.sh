#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
yarn build
yarn export

# 进入构建文件夹
cd out

git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:yqianjiang/tridict-reading.git master:gh-pages

cd -
