;(function (window, document, undefined) {
  var VideoPlayerPlugin = function (xAxis,yAxis,width,height,fullScreen,url) {  // 还要再加一个循环播放的功能。
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.width = width;
    this.height = height;
    this.fullScreen = fullScreen;
    this.url = url;
    this.mp = null;
    this.rect = null;
    this.init();
  }
    VideoPlayerPlugin.prototype = {
      constructor: VideoPlayerPlugin,
      init: function () {
        var _self = this;
        _self.rect = new Rectangle(_self.xAxis, _self.yAxis, _self.width, _self.height);
        document.onsystemevent = grabEvent;
        document.onkeydown = grabEvent;
        _self._create(_self.url, _self);
        function grabEvent () {
          switch (event.which) {
            case 13001: {
              console.log("grabEvent 13001 play------");
              _self.mp.play();
              break;
            }
            case 13002: {
              console.log("grabEvent 13002------");
              break;
            }
            case 13051: {
              console.log("grabEvent 13051 to play the next if you want------");
              _self._create(_self.url, _self);
              break;
            }
            case 2307: {
              if(_self.fullScreen) {
                break;
              }
              else {
                if (!_self.fullScreenFlag) {
                  console.log("set fullScreen");
                  _self.mp.setVideoDisplayMode(1);
                  _self.mp.refresh();
                  _self.fullScreenFlag = true;
                } else {
                  console.log("quit fullScreen");
                  _self.mp.setVideoDisplayMode(0);
                  _self.mp.setVideoDisplayArea(_self.rect);
                  _self.mp.refresh();
                  _self.fullScreenFlag = false;
                }
                break;
              }
            }
          }
        }
      },
      _create: function (url, _self) {
        if (_self.mp == null){
          _self.mp = new MediaPlayer();
          if (typeof (_self.mp) != "object") {
            console.log("Failed to create media player");
            return;
          }
          var id = _self.mp.getPlayerInstanceID();
          var flag = _self.mp.bindPlayerInstance(id);
          if (flag != 0) {
            console.log("Failed to bind player instance");
            return;
          }
          _self.mp.enableTrickMode(1);
          if(_self.fullScreen) {
            _self.mp.setVideoDisplayMode(1);
            _self.fullScreenFlag = true;
          }
          else {
            _self.mp.setVideoDisplayMode(0);
            _self.fullScreenFlag = false;
          }
          _self.mp.setVideoDisplayArea(_self.rect);
          _self.mp.refresh();
        }
        var source = url;
        console.log("videoURL is:"+ source);
        if (source.length == 0) {
          console.log("Error:Invalid media source url!");
        }
        else {
          _self.mp.setMediaSource(source);
          console.log("setMediaSource success");
        }
      },
      destroy: function () {
        if(this.mp) {
          this.mp.stop();
          this.mp.unbindPlayerInstance();
          console.log("destorying");
        }
        else {
          return;
        }
      }
    }
  window.VideoPlayerPlugin = VideoPlayerPlugin;
} (window,document));