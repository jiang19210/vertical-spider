# vertical-spider

#### 项目介绍
1. 垂直爬虫，单机部署，提供抓取，入库，更新等操作(目前支持：redis、mongodb、mysql)
2. redis主要当做队列使用,存储请求模板，主要存储在set和list集合中,set支持去重,既在抓取过程中去重 
3. 可以参考例子:test文件夹
****
集群爬虫可以参考：
https://github.com/jiang19210/bulldozer-c
****
#### 软件架构
****
#### 安装教程
1. 安装nodejs、pm2，安装最新版本即可
2. 安装redis(必须)、mongodb(不必须)、mysql(不必须)

#### 使用说明

1. 配置db连接，完整配置如下:https://github.com/jiang19210/bulldozer/blob/master/config/local.json  
    （1）除了redis是必须，mongodb和mysql可以不进行配置；但是如果利用bulldozer存储数据到mysql或者mongodb就需要进行配置  
    （2）redis配置中cluster里面是集群配置，和单机配置只需要一个即可，如果两个都配置了，会优先连接集群配置，既单机配置失效
******
全局变量说明：
1. global.HANDLER_CONTEXT_HEARDES 请求的头信息，既Heardes
2. global.TASK_SCHEDULE_ENABLE和global.TASK_SCHEDULE_STOP组成任务调度开关，默认都为true，只有都为true的时候任务才会正常运行
3. global.http_proxy = {'host': proxy.ipaddr, 'port': proxy.port}设置全局代理
4. 继承方法BulldozerC.prototype.withProxy，设置此次请求代理
