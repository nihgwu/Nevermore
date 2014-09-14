angular.module('app.services', [])

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
    if (os.platform() === 'darwin' && !quit) {
      return this.hide();
    } else {
      return close(true);
    }
  });

  var tray = new gui.Tray({
    icon: 'img/menu_icon.png'
  });
  var menu = new gui.Menu();
  tray.on('click', function() {
    return gui.Window.get().show();
  });
  var show = new gui.MenuItem({
    type: 'normal',
    label: 'Nevermore',
    icon: 'img/menu_icon.png',
    click: function() {
      return win.show();
    }
  });
  var hide = new gui.MenuItem({
    type: 'checkbox',
    label: '隐藏',
    click: function() {
      return win.hide();
    }
  });
  var quit = new gui.MenuItem({
    type: 'normal',
    label: '退出',
    click: function() {
      return win.close(true);
    }
  });
  menu.append(show);
  menu.append(hide);
  menu.append(quit);
  tray.menu = menu;
  window.tray = tray;
  this.win = win;
})

.service('ServerService', function () {
  var ss = require('shadowsocks');
  var client = null;
  this.start = function (config) {
    if(client)  client.close();
    client = ss.createServer(config.ip, config.port, config.localport, 
      config.password, config.method, 1000* config.timeout, '127.0.0.1');
  }
  this.stop = function () {
    if(client) client.close();
  }
})

.service('DataService', function () {
  var servers = [];
  for(var i=0;i<3;i++){
    var server = {
      name: 'Server '+i,
      ip: '127.0.0.1',
      port: 3000+i,
      password: 'password'+i,
      method: 'aes-256-cfb'
    }
    servers.push(server);
  }
  this.servers = servers;
  this.get = function (idx) {
    return servers[idx];
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

.service('SettingService', function () {
  this.setting = {
    localport: 8016,
    timeout: 60,
    server: 0
  }
})
