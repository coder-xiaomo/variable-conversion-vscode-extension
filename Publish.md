# 如何发行你的插件

npx @vscode/vsce login coder-xiaomo

重要！删除 out 目录，并切到 release 分支再进行打包，避免打入其他无用文件

npx @vscode/vsce publish

 INFO  Publishing 'coder-xiaomo.variable-conversion v0.0.1'...
 INFO  Extension URL (might take a few minutes): https://marketplace.visualstudio.com/items?itemName=coder-xiaomo.variable-conversion
 INFO  Hub URL: https://marketplace.visualstudio.com/manage/publishers/coder-xiaomo/extensions/variable-conversion/hub
 DONE  Published coder-xiaomo.variable-conversion v0.0.1.

具体步骤参考：
https://zhuanlan.zhihu.com/p/339695661

## 安装官方打包工具

首先我们要使用 @vscode/vsce 这个官方的插件发行工具，可以把我们的插件工程打包成 .vsix 文件，也可以直接发布到插件市场当中

后面使用命令发行插件时，如果你没有设置 package.json 里的 repository 会收到提示。但不是非要填（插件可以不开源），选 N 即可。

## 打包成 .vsix 文件

npx @vscode/vsce package

打包完成后，会在工程目录生成.vsix文件，这个文件的安装只能通过插件搜索右上方的菜单来进行


## 把插件发行到插件市场

### 注册Azure开发者账号

先得有一个 微软通行证 https://login.live.com/ ，然后打开 azure开发者中心 https://aka.ms/SignupAzureDevOps ，新建一个 azure开发组织。

#### 新建个人令牌

注意选择 Full access 和 过期时间，如果令牌过期，需要回到这个页面再新建令牌。

这步之后，一定要复制并保存好你的令牌字符串哦。之后只能新建，是找不到的。

### 注册插件市场发行账户

接着我们 注册插件市场发行账号，也在这可以管理所有市场中自己发布的插件。

当然我们也可以使用 npx @vscode/vsce 命令来创建发行账户

npx @vscode/vsce create-publisher 发行账户名称

## 发行

npx @vscode/vsce publish

这个过程里还会检查一些package.json的必填项，一切无误的话，发行就成功啦！

但此时我们的插件在市场中还搜不到，等个5-10分钟一般就有了。

## 注意事项

README.md是插件主页的详情介绍；
记得更新package.json里的版本号；
如果package.json中填写了repository字段，在发布时会要求你先提交仓库；
README.md中的图片资源必须全部是HTTPS的；
CHANGELOG.md是插件主页的变更选项卡；
一但用户安装了你的插件，只要不卸载，插件有新版时后会自动更新的。
