# Publish to Open VSX Registry (open-vsx.org)

https://open-vsx.org/user-settings/extensions

```bash
# https://www.npmjs.com/package/ovsx
npx ovsx login coder-xiaomo

# 打包依然使用 vsce, 打包前需移除 out 目录
# npx @vscode/vsce package

npx ovsx publish
```
