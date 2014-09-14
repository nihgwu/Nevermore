angular.module('app.controllers', [])

.controller('AppCtrl', function ($scope, NWService, ServerService, SettingService, DataService) {
  var win = NWService.win;

  $scope.servers = DataService.servers;
  $scope.setting = SettingService.setting;
  $scope.selected = $scope.setting.server || 0;
  $scope.current = DataService.get($scope.selected);
  $scope.methods = DataService.methods;

  $scope.debug = function () {
    win.showDevTools();
  }
  $scope.close = function () {
    win.close(true);
  }
  var current;
  $scope.edit = function () {
    current = angular.copy($scope.current);
    $scope.editing = true;
  }
  $scope.save = function () {
    var server = $scope.current;
    if(server.name && server.ip && server.port && server.password && server.method) {
      //$scope.servers.push(server);
      $scope.editing = false;
    }
  }
  $scope.cancel = function () {
    $scope.editing = false;
    $scope.current = current;
    if($scope.adding) {
      $scope.adding = false;
      $scope.methods.pop();
      $scope.selected =0;
    }
    $scope.servers[$scope.selected] = current;
  }
  $scope.start = function () {
    var config = {
      localport: $setting.localport,
      timeout: $setting.timeout
    }
    angular.extend(config,$current);
    ServerService.start(config);
  }
  $scope.stop = function () {
    ServerService.stop();
  }

  $scope.method = function () {
    console.log($scope.current.method);
  }

  $scope.editing = false;
  $scope.expanded = false;
  $scope.expand = function () {
    var width = 500;
    if($scope.expanded)  width = 300;
    $scope.expanded = !($scope.expanded);
    return win.resizeTo(width,400);
  }
  $scope.select = function (idx) {
    $scope.selected = idx;
    $scope.current = DataService.get(idx);
  }
  $scope.adding = false;
  $scope.add = function () {
    $scope.adding = true;
    $scope.edit();
    var server = {
      name: 'Server ' + $scope.servers.length,
      method: $scope.methods[0].value
    }
    $scope.servers.push(server);
    $scope.selected = $scope.servers.length-1;
    $scope.current = $scope.servers[$scope.selected];
  }
  $scope.delete = function () {
    $scope.editing = false;
    $scope.servers.splice($scope.selected,1);
    var idx = $scope.selected -1;
    if(idx<0) idx = 0;
    $scope.selected = idx;
    $scope.current = $scope.servers[idx];
  }
})
