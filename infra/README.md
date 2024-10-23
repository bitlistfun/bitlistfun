# Infra

## OS

```
Operating System: Amazon Linux 2023.6.20241010
          Kernel: Linux 6.1.112-122.189.amzn2023.x86_64
    Architecture: x86-64
```

## Nodejs

1. 下载最新安装包 https://nodejs.org/en/download/prebuilt-binaries
   ```
   wget https://nodejs.org/dist/v20.17.0/node-v20.17.0-linux-x64.tar.xz
   ```

2. 解压缩
   ```
   xz -d node-v20.17.0-linux-x64.tar.xz
   tar xvf node-v20.17.0-linux-x64.tar
   ```

3. 添加路径 `~/.bash_profile`
   ```
   if [ -d "$HOME/node-v20.17.0-linux-x64/bin" ] ; then
       PATH="$HOME/node-v20.17.0-linux-x64/bin:$PATH"
   fi
   ```

4. 测试
   ```
   . ~/.bash_profile
   node -v
   ```
