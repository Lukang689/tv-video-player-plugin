# 电视机顶盒视频播放插件

- 东方有线电视机顶盒UUTVOS操作系统中浏览器播放 .m3u8 格式视频插件。
- 实测，支持 .mp4 格式。
- 使用 NGB-H 技术规范。

## 使用方法(参考 index.html)

```
new VideoPlayerPlugin(xAxis,yAxis,width,height,fullScreen,url);
```

### 参数说明

1. xAxis: 视频区域左上角的 x 轴坐标值。数据类型：number。
2. yAxis: 同上。
3. width: 视频区域的宽度。数据类型：number。
4. height: 同上。
5. fullScreen: 数据类型：boolean。true：视频全屏播放，不能使用切换按钮切换。false：视频小窗口播放，可以切换全屏播放。（切换按钮的 keycode:2307）
6. url: 视频的播放地址。数据类型：string。