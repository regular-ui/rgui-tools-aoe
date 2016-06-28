# Developer Tools AOE for Regular UI
## Commands

- `rgui-tools-aoe help`：查看帮助
- `rgui-tools-aoe list`：列出会影响到的仓库。
- `rgui-tools-aoe open-doc`：迅速浏览所有仓库的doc本地文件。
- `rgui-tools-aoe <fast-cmd>`：`<fast-cmd>`可以为`doc`、`gh-pages`、`test`、`publish`，迅速执行每个仓库中`rgui-tools`对应的命令。
- `rgui-tools-aoe <cmd>`：在每个仓库中执行`<cmd>`命令。

## Options

- `-a, --async`：是否异步执行任务。注意：对于异步执行某些任务，如`gh-pages`，不同仓库之间会有冲突。
- `-d, --debug`：是否只进行测试，不真正执行命令。
