// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'reaki' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'reaki.services' is found in services.js
// 'reaki.controllers' is found in controllers.js
angular.module('app', ['pascalprecht.translate', 'app.directives', 'app.services', 'app.controllers'])
/*
.run(function($rootScope) {
})
*/
.config(function($translateProvider) {
	
  $translateProvider.translations('en', {
  	NAME: 'Nevermore',
  	DESCRIPTION: 'shadowsocks client',
  	SERVER_NAME: 'Server Name',
  	SERVER_IP: 'Server IP',
  	SERVER_PORT: 'Server Port',
  	SERVER_PASSWORD: 'Password',
  	SERVER_METHOD: 'Encryption',
  	TIMEOUT: 'Timeout',
  	LOCAL_PORT: 'Local Port',
  	BUTTON_START: 'Start',
  	BUTTON_STOP: 'Stop',
  	BUTTON_SAVE: 'Save',
  	BUTTON_CANCEL: 'Cancel',
  	BUTTON_ADD: 'Add',
  	BUTTON_REMOVE: 'Remove',
  	FEEDBACK: 'Feedback'
  });

  $translateProvider.translations('zh', {
  	NAME: 'Nevermore',
  	DESCRIPTION: 'shadowsocks client',
  	SERVER_NAME: '服务器名称',
  	SERVER_IP: '服务器IP',
  	SERVER_PORT: '服务器端口',
  	SERVER_PASSWORD: '密码',
  	SERVER_METHOD: '加密方式',
  	TIMEOUT: '连接超时',
  	LOCAL_PORT: '本地端口',
  	BUTTON_START: '启动',
  	BUTTON_STOP: '停止',
  	BUTTON_SAVE: '保存',
  	BUTTON_CANCEL: '取消',
  	BUTTON_ADD: '添加',
  	BUTTON_REMOVE: '删除',
  	FEEDBACK: '问题反馈'
  });

  $translateProvider.preferredLanguage('en');
});

