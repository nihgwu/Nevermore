angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $translate, NWService, ServerService, DataService, ShareService) {
  $scope.servers = DataService.getServers();
  $scope.local = DataService.getLocal();
  $scope.selected = DataService.getSelected();
  if ($scope.servers.length > 0 && $scope.selected < $scope.servers.length) {
    $scope.current = $scope.servers[$scope.selected];
    $scope.running = DataService.getRunning();
    $scope.cursor = DataService.getSelected();
  }
  $scope.methods = DataService.methods;

  $scope.message = 'MSG_STOPED';

  function blink(message, force) {
    $scope.message = message;
    if (force) $scope.$apply();
    $timeout(function() {
      $scope.message = $scope.running ? 'MSG_STARTED' : 'MSG_STOPED';
    }, 3000);
  }

  $scope.toggle = function() {
    $scope.running = !($scope.running);
    if ($scope.running) return $scope.stop();
    return $scope.start();
  }

  $scope.language = function(lang) {
    $translate.use(lang);
    DataService.setLanguage(lang);
  }

  $scope.listyle = function(idx) {
    var style = '';
    if ($scope.running && $scope.selected == idx) style += 'running ';
    if ($scope.cursor == idx) style += 'selected';
    return style;
  }

  $scope.debug = function() {
    NWService.showDebug();
  }
  $scope.close = function() {
    NWService.hideWin();
  }
  var current;
  $scope.edit = function() {
    if ($scope.running && $scope.cursor == $scope.selected) return blink('MSG_STOPFIRST');
    if ($scope.servers.length == 0) return blink('MSG_ADDSERVER');
    $scope.editing = true;
  }
  $scope.save = function() {
    var server = $scope.current;
    if (server.name && server.ip && server.port && server.password && server.method) {
      $scope.editing = false;
      DataService.setServers($scope.servers);
      DataService.setLocal($scope.local);
    } else {
      blink('MSG_NOTFINISHED');
    }
  }
  $scope.cancel = function() {
    $scope.editing = false;
    $scope.selected = DataService.getSelected();
    $scope.current = DataService.getCurrent();
    $scope.servers = DataService.getServers();
    $scope.local = DataService.getLocal();
  }

  $scope.start = function() {
    if ($scope.servers.length == 0) return blink('MSG_CONFIGZERO');
    $scope.message = 'MSG_STARTING';
    var config = {
      localport: $scope.local.localport,
      timeout: $scope.local.timeout
    }
    angular.extend(config, $scope.current);
    ServerService.start(config);
    $scope.running = true;
    $scope.selected = $scope.cursor;
    NWService.setRunning($scope.running);
    DataService.setSelected($scope.selected);
    DataService.setRunning($scope.running);
    $scope.message = 'MSG_STARTED';
  }
  $scope.stop = function() {
    ServerService.stop();
    $scope.running = false;
    NWService.setRunning($scope.running);
    DataService.setRunning($scope.running);
    $scope.message = 'MSG_STOPED';
  }

  $scope.method = function() {
    //console.log($scope.current.method);
  }

  $scope.editing = false;
  $scope.expanded = false;
  $scope.expand = function() {
    var width = 500;
    if ($scope.expanded) {
      width = 300;
      $scope.cursor = $scope.selected;
      $scope.current = $scope.servers[$scope.cursor];
    }
    $scope.expanded = !($scope.expanded);
    return NWService.resizeTo(width, 400);
  }
  $scope.select = function(idx) {
    $scope.cursor = idx;
    $scope.current = $scope.servers[idx];
  }
  $scope.add = function() {
    $scope.editing = true;
    var server = {
      name: 'Server ' + $scope.servers.length,
      method: $scope.methods[0].value
    }
    $scope.servers.push(server);
    $scope.cursor = $scope.servers.length - 1;
    $scope.current = $scope.servers[$scope.cursor];
  }
  $scope.remove = function() {
    $scope.editing = false;
    if ($scope.running && $scope.cursor == $scope.selected)
      return blink('MSG_CANTREMOVE')
    else if ($scope.cursor < $scope.selected) {
      $scope.selected--;
      DataService.setSelected($scope.selected);
    }
    $scope.servers.splice($scope.cursor, 1);
    var idx = $scope.cursor - 1;
    if (idx < 0) idx = 0;
    $scope.cursor = idx;
    $scope.current = $scope.servers[idx];
    DataService.setServers($scope.servers);
  }
  $scope.up = function() {
    if ($scope.cursor == 0) return;
    var tmp = $scope.servers.splice($scope.cursor, 1);
    $scope.servers.splice($scope.cursor - 1, 0, tmp[0]);
    if ($scope.selected == $scope.cursor) {
      $scope.selected--;
      DataService.setSelected($scope.selected);
    } else if ($scope.selected == $scope.cursor - 1) {
      $scope.selected++;
      DataService.setSelected($scope.selected);
    }
    DataService.setServers($scope.servers);
    $scope.cursor--;
  }
  $scope.down = function() {
    if ($scope.cursor == $scope.servers.length - 1) return;
    var tmp = $scope.servers.splice($scope.cursor, 1);
    $scope.servers.splice($scope.cursor + 1, 0, tmp[0]);
    if ($scope.selected == $scope.cursor) {
      $scope.selected++;
      DataService.setSelected($scope.selected);
    } else if ($scope.selected == $scope.cursor + 1) {
      $scope.selected--;
      DataService.setSelected($scope.selected);
    }
    DataService.setServers($scope.servers);
    $scope.cursor++;
  }

  $scope.sharing = false;
  $scope.share = function() {
    $scope.base64 = ShareService.base64($scope.current);
    $scope.qrcode = ShareService.qrcode($scope.base64);
    $scope.sharing = true;
  }
  $scope.copy = function() {
    NWService.copy($scope.base64);
    blink('MSG_COPIED');
  }
  $scope.back = function() {
    $scope.sharing = false;
  }

  $scope.import = function() {
    var chooser = document.querySelector('#import');
    chooser.addEventListener('change', function(e) {
      var config = require(this.value);
      if (!config) return blink('MSG_CONFIGERROR', true);
      if (!config.servers || config.servers.length == 0) return blink('MSG_CONFIGZERO', true);

      $scope.servers = config.servers;
      $scope.selected = config.selected || 0;
      $scope.current = $scope.servers[$scope.selected];
      $scope.cursor = config.selected || 0;
      $scope.running = config.running || false;
      $scope.local.timeout = config.local.timeout || 60;
      $scope.local.localport = config.local.localport || 1080;

      DataService.setServers($scope.servers);
      DataService.setLocal($scope.local);
      DataService.setSelected($scope.selected);
      DataService.setRunning($scope.running);

      blink('MSG_IMPORTED', true);

      if ($scope.running) {
        $timeout(function() {
          $scope.start();
        })
      }
    }, false);

    chooser.click();
  }

  $scope.imported = function() {
    var file = document.querySelector('#import').value;
  }

  $scope.export = function() {
    var chooser = document.querySelector('#export');
    chooser.addEventListener("change", function(e) {
      var fs = require('fs');
      var config = {};
      config.servers = $scope.servers;
      config.local = $scope.local;
      config.selected = $scope.selected;
      config.running = $scope.running;
      fs.writeFileSync(this.value, JSON.stringify(config, null, 2));

      blink('MSG_EXPORTED', true);
    }, false);

    chooser.click();
  }

  $scope.feedback = function() {
    var link = 'http://liteneo.com';
    NWService.openLink(link);
  }
  $scope.$on('running', function(event, data) {
    $timeout(function() {
      if (data)
        return $scope.start();
      return $scope.stop();
    })
  })
  if ($scope.running) {
    $timeout(function() {
      $scope.start();
    })
  }
})
