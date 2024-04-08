# 命名方式转换插件 Variable Conversion

一个强大的变量名转换插件，支持常用命名方式间一键转换，支持右键菜单、快捷键、底栏等多种方式使用。<br>
A powerful variable naming conversion extension. You can use it through the editer menu, shortcut keys and bottom bar.

## 如何使用？ How to Use?

> 🔭 Tips for Chinese users: 如果您无法看到下文图片，请[点击这里查看](https://gitee.com/coder-xiaomo/variable-conversion-vscode-extension/blob/main/README.md)

#### 1. 选中代码中需要转换的内容 <br>Select The Text To Convert

![Step1. Select The Text To Convert](image/step1-select-the-text-to-convert.gif)

> Tips:<br>
> 可以通过 `Ctrl + D` 快捷键选中光标所在的单词<br>
> You can press `Ctrl + D` to select the word near the cursor

#### 2. 按 `Shift + Alt + T`<br>Press `Shift + Alt + T`

![Step2. Press Shift + Alt + T](image/step2-press-shift-alt-t.gif)

或者点击状态栏的 `字符串转换` 按钮<br>
Or click the `String Conversion` button in the status bar

![Step2. Press Status Bar Button](image/step2-press-status-bar-button.png)

或者右键 -> `字符串转换`<br>
Or right-click -> `String Conversion`

![Step2. Variable conversion on the context menu](image/step2-variable-conversion-on-context-menu.png)

或者右键 -> 将字符串转换为... <br>
Or right-click on the selected text -> Convert string to...

![Step2. Right-click on the selected text](image/step2-right-click-on-the-selected-text.gif)

#### 3. 选择转换目标，转换完成 <br>Select the conversion target and complete

## 支持的类型 Support Case

| 类型                                | Case                     | 举例 e.g.        |
| ----------------------------------- | ------------------------ | ---------------- |
| 小驼峰(驼峰)命名                    | Camel Case               | fooBar           |
| 大驼峰(帕斯卡)命名                  | Pascal Case              | FooBar           |
| 下划线(蛇形)命名                    | Snake Case               | foo_bar          |
| 下划线(蛇形) + 小驼峰(驼峰)命名     | Snake Camel Case         | foo_Bar          |
| 下划线(蛇形) + 大驼峰(帕斯卡)命名   | Snake Pascal Case        | Foo_Bar          |
| 下划线(蛇形) + 全大写命名           | Snake Upper Case         | FOO_BAR          |
| 中划线(连字符/脊柱式)命名                  | Kebab Case / Spinal Case | foo-bar          |
| 中划线(连字符/脊柱式) + 小驼峰(驼峰)命名   | Kebab Camel Case         | foo-Bar          |
| 中划线(连字符/脊柱式) + 大驼峰(帕斯卡)命名 | Kebab Pascal Case        | Foo-Bar          |
| 中划线(连字符/脊柱式) + 全大写命名         | Kebab Upper Case         | FOO-BAR          |
| 空格分隔命名                        | Space Case               | foo bar          |
| 空格分隔 + 小驼峰(驼峰)命名         | Space Camel Case         | foo Bar          |
| 空格分隔 + 大驼峰(帕斯卡)命名       | Space Pascal Case        | Foo Bar          |
| 空格分隔 + 全大写命名               | Space Upper Case         | FOO BAR          |
| 全小写                              | Lower Case               | foo_bar / foobar |
| 全大写                              | Upper Case               | FOO_BAR / FOOBAR |



## 反馈 Feedback

如果您觉得本插件还不够好用，有更好的使用建议；或者发现了 BUG，欢迎[前往 GitHub 仓库提 issue](https://github.com/coder-xiaomo/variable-conversion-vscode-extension/issues). 使用简体中文、繁體中文或 English 均可，不建议使用翻译软件翻译，否则可能会让文字描述变得抽象难懂。<br>
If you feel that this extension is not good to use, or you have a better use suggestion, or found a BUG, welcome to [create an issue on GitHub](https://github.com/coder-xiaomo/variable-conversion-vscode-extension/issues). English, 简体中文 or 繁體中文 are all supported, it is not recommended to use translation software, otherwise it may make the text description become abstract and difficult to understand.

## 开源共建 OpenSource & Contribute

本插件已开源(MIT License)，欢迎提 Pr 共建，让插件变得更好用！<br>
This plug-in has been open source (MIT License), welcome to Pr co-construction, let the plug-in become better!

GitHub Repo (开源地址): https://github.com/coder-xiaomo/variable-conversion-vscode-extension.git

Gitee Mirror (码云镜像): https://gitee.com/coder-xiaomo/variable-conversion-vscode-extension.git

<!--

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

-->

**Enjoy!**
