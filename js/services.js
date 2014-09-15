angular.module('app.services', [])

.service('ServerService', function () {
  var ss = require('shadowsocks');
  var client = null;
  this.start = function (config) {
    if(client)  return client.close(function(){
      client = ss.createServer(config.ip, config.port, config.localport, 
        config.password, config.method, 1000* config.timeout, '127.0.0.1');
    });
    client = ss.createServer(config.ip, config.port, config.localport, 
      config.password, config.method, 1000* config.timeout, '127.0.0.1');
  }
  this.stop = function () {
    if(client) client.close();
  }
})

.service('NWService', function () {

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
    return this.hide();
  });
  win.on('close', function(quit) {
    return this.hide();
  });

  var tray = new gui.Tray({
    icon: 'img/menu_icon.png'
  });
  var menu = new gui.Menu();
  tray.on('click', function() {
    return gui.Window.get().show();
  });
  var showItem = new gui.MenuItem({
    type: 'normal',
    label: 'Nevermore',
    icon: 'img/off_icon.png',
    click: function() {
      return win.show();
    }
  });
  var hideItem = new gui.MenuItem({
    type: 'normal',
    label: '隐藏',
    click: function() {
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
  menu.append(showItem);
  menu.append(hideItem);
  menu.append(quitItem);
  tray.menu = menu;
  window.tray = tray;
  this.win = win;
  this.openLink = function (link) {
    gui.Shell.openExternal(link);
  }
  this.createMenu = function(menuStructure) {
    var menu = new gui.Menu(menuStructure.root);
    if(menuStructure.root && menuStructure.root.items) {
      console.log("Creating %d menu items for root menu", menuStructure.root.items.length);
      createMenuItems(menu, menuStructure.root.items);
    }
    if(menu.type === 'menubar') {
      this.window.menu = menu;
    }
    return menu;
  };
})

.service('DataService', function () {
  this.getCurrent = function () {
    return this.getServers()[this.getSelected()];
  }
  this.getServers = function () {
    if(localStorage.servers)
      return angular.fromJson(localStorage.servers);
    return [{
      name: 'Public Server',
      ip: '209.141.36.62',
      port: 8348,
      password: '$#HAL9000!',
      method: 'aes-256-cfb'
    }]
  }
  this.setServers = function (servers) {
    localStorage.servers = angular.toJson(servers);
  }
  this.getSelected = function () {
    return localStorage.selected || 0;
  }
  this.setSelected = function (selected) {
    localStorage.selected = selected;
  }
  this.getRunning = function () {
    return localStorage.running == 'true';
  }
  this.setRunning = function (running) {
    localStorage.running = running;
  }
  this.getSetting = function () {
    if(localStorage.setting)
      return angular.fromJson(localStorage.setting);
    return localStorage.setting || {
      localport: 1080,
      timeout: 600
    }
  }
  this.setSetting = function (setting) {
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
