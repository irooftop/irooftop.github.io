# 打开未签名的应用

桌面安装程序尚未签名或公证，因此首次启动时，macOS 和 Windows 会显示警告。这是一次性的步骤：允许应用一次之后，它就能正常打开，包括以相同方式安装的更新之后。

::: tip 不想这样做？
[自己构建应用](./desktop#build-it-yourself)，或运行[服务器](./getting-started#install)并在浏览器中使用：`brew install irooftop/tap/rooftop`、`cargo install rooftop` 或 [Docker](./docker)。
:::

## macOS

![在 macOS 上打开未验证的应用：“无法打开”警告、完成、系统设置、隐私与安全性、仍要打开、密码，然后应用打开](/how-to-open-an-unsigned-app-on-macos.svg)

在 macOS 15 Sequoia 及更高版本中：

1. 打开 **iRoof.top**。macOS 会提示“无法打开“iRoof.top”：Apple 无法验证……”。点击**完成**。
2. 打开**苹果菜单 → 系统设置… → 隐私与安全性**。
3. 向下滚动到**安全性**部分：“已阻止使用“iRoof.top”，以保护你的 Mac”。点击**仍要打开**。
4. 用**仍要打开**确认，并输入你的密码或使用触控 ID。

**仍要打开**按钮只会在你尝试打开应用后出现，大约持续一小时。如果没有出现，请再次打开应用，然后回到隐私与安全性。

在 macOS 14 Sonoma 及更早版本中，在访达中右键点击（或按住 Control 点击）应用，选择**打开**，然后再次点击**打开**。

### 从终端

移除浏览器加在下载文件上的隔离标记也可以：

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

它不一定总是有效：在较新的 macOS 上，终端可能需要在隐私与安全性中获得**App 管理**（或**完全磁盘访问权限**）才能修改 `/Applications` 中的应用，否则会失败并显示 `Operation not permitted`。上面的步骤始终有效。

::: details “iRoof.top 已损坏，无法打开”
这条消息同样指的是隔离标记，而不是下载损坏。点击**取消**（不要点击**移到废纸篓**），然后运行上面的 `xattr` 命令，或按照系统设置中的步骤操作。
:::

## Windows

SmartScreen 会针对安装程序显示**Windows 已保护你的电脑**：

1. 点击**更多信息**。
2. 点击**仍要运行**。

如果浏览器阻止了下载（*不常下载的文件*），请打开下载列表，选择**⋯ → 保留**，然后选择**显示更多 → 仍然保留**。对于 `.msi`，你还可以在运行前右键单击 → **属性** → 勾选**解除锁定** → **确定**。

在启用了**智能应用控制**的 Windows 11 上，未签名的应用会被阻止，且没有**仍要运行**按钮。请改用[服务器](./getting-started#install)，或在**Windows 安全中心 → 应用和浏览器控制 → 智能应用控制设置**中关闭智能应用控制。

## Linux

Linux 不会阻止未签名的应用，但 AppImage 需要运行权限：

```sh
chmod +x iRoof.top_amd64.AppImage    # 或：属性 → 权限 → 允许将文件作为程序执行
./iRoof.top_amd64.AppImage
```

如果它报告 FUSE 相关错误（`dlopen(): error loading libfuse.so.2`），请安装 `libfuse2`（Ubuntu 24.04：`sudo apt install libfuse2t64`），或使用 `--appimage-extract-and-run` 运行。

这些软件包通过软件包管理器安装，它接受本地的未签名软件包：

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian、Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
