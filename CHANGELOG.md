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

### Internal

-->

## 2.0.1

### Internal

- Upgrade plugin dependency versions. (升级插件依赖版本)
- Modify eslint configuration. (调整 eslint 配置)

## 2.0.0

### Added

- New: Support path conversions via shortcut keys `Ctrl + Alt + /` and `Ctrl + Shift + Alt + /` (also supports multi-selection conversion). (支持通过 `Ctrl + Alt + /`, `Ctrl + Shift + Alt + /` 快捷键进行路径转换 (同时支持多选区转换))
- New: Support following path conversion type: QuickPick menu conversion, context menu conversion, status bar button conversion, shortcut key conversion. (支持以下路径转换方式：QuickPick 菜单转换、右键菜单转换、状态栏按钮转换、快捷键转换)

### Changed

- Do not display the editor context menu `Variable Conversion` option when text is not selected. (当未选中文本时，不显示右键菜单 `变量转换` 选项)

### Improvement

- Adjust the project code directory structure. (项目代码目录结构调整)

## 1.1.0

### Added

- Support configuring which formats are disabled through the VSCode settings page. It will apply to QuickPick menu conversions, context menu conversions, and shortcut key cyclic conversions. (支持通过 VSCode 设置页配置哪些格式是禁用的。配置后将同时对 QuickPick 菜单转换、右键菜单转换、快捷键循环转换生效)

## 1.0.11

### Improvement

- Imperfect support: When a sub window is activated, clicking on the status bar of the main window can correctly bring up the QuickPick menu. (不完美支持：当子窗口激活时，点击主窗口状态栏能够正确弹出快速拾取菜单)

## 1.0.10

### Added

- Add 4 new conversion types: Dot Case, Dot Camel Case, Dot Pascal Case, Dot Upper Case (新增 4 种转换类型: 点分隔 + 全小写/小驼峰/大驼峰/全大写)

## 1.0.8

### Added

- New: Supports multi-selection conversion (支持多选区转换)
- New: Supports scrolling variable conversion via shortcut keys `Ctrl + Alt + [` and `Ctrl + Alt + ]` (also supports multi-selection conversion). (支持通过 `Ctrl + Alt + [`, `Ctrl + Alt + ]` 快捷键进行变量循环转换 (同时支持多选区转换))

## 1.0.7

### Added

- Add 4 new conversion types: space case, space camel case, space pascal case, space upper case (新增 4 种转换类型: 空格分隔 + 小驼峰/大驼峰/全小写/全大写)

### Changed

- Optimize QuickPick conversion value display (优化 QuickPick 转换值展示)
- Fixed typo: keyword of KEBAB_PASCAL_CASE, KEBAB_UPPER_CASE (修正 KEBAB_PASCAL_CASE, KEBAB_UPPER_CASE 关键词错误)

## 1.0.6

### Added

- Add a status bar button to trigger string conversion (添加状态栏按钮，支持通过状态栏按钮触发变量转换)

## 1.0.5

### Fixed

- Fix bug: The infobox showed `editor is undefined` when the current active TAB was not an editor

## 1.0.4

### Added

- Add shortcut key `Shift + Alt + T` to show vscode QuickPick window (添加快捷键 Shift + Alt + T 来显示 vscode QuickPick 弹窗)
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