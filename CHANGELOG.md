# Change Log

<!--

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

All notable changes to this extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

-->

<!--

## [Unreleased]

### Added


### Changed


### Removed

-->


## 1.0.7

### Added

- Add 4 new conversion types: space case, space camel case, space pascal case, space upper case (新增 4 种转换类型: 空格分隔 + 小驼峰/大驼峰/全小写/全大写)

### Changed

- Optimize QickPick conversion value display (优化 QickPick 转换值展示)
- Fixed typo: keyword of KEBAB_PASCAL_CASE, KEBAB_UPPER_CASE (修正 KEBAB_PASCAL_CASE, KEBAB_UPPER_CASE 关键词错误)

## 1.0.6

### Added

- Add a status bar button to trigger string conversion (添加底栏按钮，支持通过底栏按钮触发字符串转换)

## 1.0.5

### Fixed

- Fix bug: The infobox showed `editor is undefined` when the current active TAB was not an editor


## 1.0.4

### Added

- Add shortcut key `Shift + Alt + T` to show vscode QickPick window (添加快捷键 Shift + Alt + T 来显示 vscode QickPick 弹窗)
- Write `README.md` (完善 README 文档)

## 1.0.3

### Added

- Add extension logo (添加插件 logo)

### Fixed

- Fixed an issue where the editor context menu was not displayed correctly. (修复右键菜单未能正确展示的问题)

## 1.0.0

### Added

- Adds an editor context menu with submenu
- Implement conversion to Camel Case, Pascal Case, Snake Case(Snake Camel, Snake Pascal, Snake Upper), Kebab Case(Kebab Camel, Kebab Pascal, Kebab Upper), Lower Case, Upper Case
- Add test cases
- Initial release