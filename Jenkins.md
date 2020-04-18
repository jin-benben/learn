### Linux下的安装使用

　Jenkins 是一款业界流行的开源持续集成工具，广泛用于项目开发，具有自动化构建、测试和部署等功能

- 安装jenkins

``

```linux
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

- 启动jenkins

```
service jenkins start 
```

`jenkins默认使用8080端口，如果使用阿里云，还需要在安全组中开放8080端口`

　启动jenkins服务后，可以在8080端口访问到jenkins

### 初始化



　　启动jenkins服务后，可以在8080端口访问到jenkins



　　然后在服务器的指定目录找到密码登录

```
/var/lib/jenkins/secrets/initialAdminPassword
```

　　按照默认配置安装插件
![jenkins](https://pic.xiaohuochai.site/blog/jenkins2.png)

　　等待插件安装完成
![jenkins](https://pic.xiaohuochai.site/blog/jenkins3.png)

　　创建一个管理员账户，完成配置后，就可以登录 Jenkins 了

![jenkins](https://pic.xiaohuochai.site/blog/jenkins4.png)

 

### 安装插件



　　下面来安装nodejs插件

![jenkins](https://pic.xiaohuochai.site/blog/jenkins6.png)

　　可以看到，Jenkins提供了丰富的插件供开发者使用，找到需要的[NodeJS Plugin]，勾选后点击安装即可

![jenkins](https://pic.xiaohuochai.site/blog/jenkins7.png)

　　3、安装完毕后，选择系统管理->全局工具配置，配置node下载及安装

![jenkins](https://pic.xiaohuochai.site/blog/jenkins8.png)

 

### git钩子



　　为了能够与 GitHub 配合，需要进入对 GitHub 进行一些设置

　　在github中进入博客所在的repo，并点击settings。在设置界面单击左侧的Integrations & services，并选择add service。从下拉菜单中，选中Jenkins(Github plugin)

![jenkins](https://pic.xiaohuochai.site/blog/jenkins10.png)

 

　　从下拉菜单中，选中`Jenkins (GitHub plugin)`。在新打开的界面，填写Jenkins的信息

![jenkins](https://pic.xiaohuochai.site/blog/jenkins11.png)

　　完整的地址为`http://xx.xx.xx.xx:8080/GitHub-webhook/`。把这里的`xx`换成实际的IP地址或者域名即可。需要注意的是，网址末尾的斜杠一定不能省略

　　填写好信息以后保存，GitHub就配置好了

 

### 配置任务



　　1、安装好github钩子以及nodejs插件后，接下来开始配置任务

　　点击创建一个新任务，填写任务名称，构建的项目类型可根据实际情况进行选择，本次选择第一种即可

![jenkins](https://pic.xiaohuochai.site/blog/jenkins5.png)

　　2、配置基础信息

![jenkins](https://pic.xiaohuochai.site/blog/jenkins12.png)

　　3、往下拉，看到`源码管理`，点选`Git`，依然填写博客对应的Repo地址

![jenkins](https://pic.xiaohuochai.site/blog/jenkins13.png)

　　4、继续往下拉，在`构建触发器`单击`增加构建步骤`，在弹出的下拉菜单中选择`Execute shell`。勾选`GitHub hook trigger for GITScm polling。`构建环境选择nodejs

![jenkins](https://pic.xiaohuochai.site/blog/jenkins14.png)

 

### 构建过程



　　一般地，构建过程，输入如下

```
npm install &&
npm run build
```

　　但是，经过实际测试，在服务器上使用npm install会使服务器卡死。于是，变通的方法是，在本地直接构建，并将构建后的文件上传到github，然后通过jenkins取得。于是，构建过程如下所示

```
cp -r ./dist /home/xiaohuochai/blog/admin
```

　　把dist目录下的内部复制到`/home/xiaohuochai/blog/admin`下，并且如果文件名相同，就会直接覆盖

【修改权限】

　　由于Jenkins在安装的时候，会自动创建一个名为`jenkins`的普通账号，这个账号没有管理员权限。jenkins执行命令的时候，它也会使用这个账号。但是由于admin这个文件夹是用户`xiaohuochai`创建的，所以`jenkins`账号默认是没有权限读写这个文件夹的。现在需要给`jenkins`账号授予权限。使用xiaohuochai这个账号登录服务器，使用以下命令给`jenkins`赋予权限，让它可以读写admin文件夹：

```
sudo chown -R jenkins:jenkins /home/xiaohuochai/blog/admin
```

　　执行完成这一行命令以后，jenkins才可以把其他地方的文件复制到这个文件夹里面



**需要注意的是配置git的选择ssh的时候钥匙是私钥private key**

![1568169788219](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568169788219.png)



来源;[使用jenkins进行前端项目自动部署](https://www.cnblogs.com/xiaohuochai/p/9096873.html)