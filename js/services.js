angular.module('app.services', [])

.service('ServerService', function($timeout) {
  var ss = require('shadowsocks');
  var client = null;

  var restarting = false;
  var restart = function(config) {
    if (restarting) {
      console.log('Already restarting');
      retrun;
    }
    isRestarting = true;
    var start = function() {
      restarting = false;
      client = ss.createServer(config.ip, parseInt(config.port), parseInt(config.localport),
        config.password, config.method, 1000 * config.timeout, '127.0.0.1');
    }
    if (client != null) {
      if (client.address()) {
        client.close();
      }
      return $timeout(start, 1000);
    } else return start();
  }

  this.start = restart;
  this.stop = function() {
    if (client) client.close();
    client = null;
  }
})

.service('NWService', function($rootScope) {
  var self = this;
  var gui = require('nw.gui');
  var os = require('os');

  var win = gui.Window.get();
  win.on('maximize', function() {
    return;
  });
  win.on('unmaximize', function() {
    return;
  });
  win.on('minimize', function() {
    hideWin();
  });
  win.on('close', function() {
    hideWin();
  });

  var hideWin = function() {
    self.show = false;
    hideItem.label = '显示';
    return win.hide();
  }
  this.hideWin = hideWin;
  this.showDebug = function() {
    win.showDevTools();
  }
  this.resizeTo = function(width, height) {
    win.resizeTo(width, height);
  }

  var tray = new gui.Tray({
    icon: 'img/off_tray_icon.png'
  });
  var menu = new gui.Menu();
  tray.on('click', function() {
    if (!self.show) win.show();
    self.show = true;
    hideItem.label = '隐藏';
    return win.focus();
  });
  this.running = false;
  var startItem = new gui.MenuItem({
    type: 'normal',
    label: 'Nevermore',
    icon: 'img/off_icon.png',
    click: function() {
      $rootScope.$broadcast('running', !self.running);
    }
  });
  this.show = true;
  var hideItem = new gui.MenuItem({
    type: 'normal',
    label: '隐藏',
    click: function() {
      self.show = !self.show;
      this.label = self.show ? '隐藏' : '显示';
      if (self.show) return win.show();
      return win.hide();
    }
  });
  var quitItem = new gui.MenuItem({
    type: 'normal',
    label: '退出',
    click: function() {
      return win.close(true);
    }
  });
  menu.append(startItem);
  menu.append(hideItem);
  menu.append(quitItem);
  tray.menu = menu;
  window.tray = tray;

  this.openLink = function(link) {
    gui.Shell.openExternal(link);
  }
  this.setRunning = function(running) {
    self.running = running;
    tray.icon = running ? 'img/on_tray_icon.png' : 'img/off_tray_icon.png';
    startItem.icon = running ? 'img/on_icon.png' : 'img/off_icon.png';
  }
})

.service('DataService', function() {
  this.getCurrent = function() {
    return this.getServers()[this.getSelected()];
  }
  this.getServers = function() {
    if (localStorage.servers)
      return angular.fromJson(localStorage.servers);
    return [{
      name: 'Public Server',
      ip: '209.141.36.62',
      port: 8348,
      password: '$#HAL9000!',
      method: 'aes-256-cfb'
    }]
  }
  this.setServers = function(servers) {
    localStorage.servers = angular.toJson(servers);
  }
  this.getSelected = function() {
    return localStorage.selected || 0;
  }
  this.setSelected = function(selected) {
    localStorage.selected = selected;
  }
  this.getRunning = function() {
    return localStorage.running == 'true';
  }
  this.setRunning = function(running) {
    localStorage.running = running;
  }
  this.getSetting = function() {
    if (localStorage.setting)
      return angular.fromJson(localStorage.setting);
    return localStorage.setting || {
      localport: 1080,
      timeout: 600
    }
  }
  this.setSetting = function(setting) {
    localStorage.setting = angular.toJson(setting);
  }

  this.methods = [{
    text: 'AES-256-CFB',
    value: 'aes-256-cfb'
  }, {
    text: 'AES-192-CFB',
    value: 'aes-192-cfb'
  }, {
    text: 'AES-128-CFB',
    value: 'aes-128-cfb'
  }, {
    text: 'BF-CFB(Blowfish)',
    value: 'bf-cfb'
  }, {
    text: 'CAMELLIA-256-CFB',
    value: 'camellia-256-cfb'
  }, {
    text: 'CAMELLIA-192-CFB',
    value: 'camellia-192-cfb'
  }, {
    text: 'CAMELLIA-128-CFB',
    value: 'camellia-128-cfb'
  }, {
    text: 'CAST5-CFB',
    value: 'cast5-cfb'
  }, {
    text: 'DES-CFB',
    value: 'des-cfb'
  }, {
    text: 'IDEA-CFB',
    value: 'idea-cfb'
  }, {
    text: 'RC2-CFB',
    value: 'rc2-cfb'
  }, {
    text: 'RC4',
    value: 'rc4'
  }, {
    text: 'RC4-MD5',
    value: 'rc4-md5'
  }, {
    text: 'SEED-CFB',
    value: 'seed-cfb'
  }, {
    text: 'Table',
    value: 'table'
  }, ]
})
