// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'reaki' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'reaki.services' is found in services.js
// 'reaki.controllers' is found in controllers.js
angular.module('app', ['toggle-switch', 'pascalprecht.translate', 'app.filters', 'app.directives', 'app.services', 'app.controllers'])
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
      BUTTON_START: 'On',
      BUTTON_STOP: 'Off',
      BUTTON_SAVE: 'Save',
      BUTTON_CANCEL: 'Cancel',
      BUTTON_IMPORT: 'Import',
      BUTTON_EXPORT: 'Export',
      BUTTON_COPY: 'Copy',
      BUTTON_BACK: 'Back',
      FEEDBACK: 'Feedback',
      MSG_STARTING: 'Server Starting',
      MSG_STARTED: 'Server Started',
      MSG_STOPED: 'Server Stoped',
      MSG_COPIED: 'Copied to Clipboard',
      MSG_CONFIGERROR: 'Config File Error',
      MSG_CONFIGZERO: 'No Configured Servers',
      MSG_EXPORTED: 'Config Exported',
      MSG_IMPORTED: 'Config Imported',
      MSG_CANTREMOVE: 'Can\'t Remove',
      MSG_ADDSERVER: 'Please Add a Server',
      MSG_STOPFIRST: 'Stop Current Server First',
      MSG_NOTFINISHED: 'Edit Not Finished'
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
      BUTTON_IMPORT: '导入',
      BUTTON_EXPORT: '导出',
      BUTTON_COPY: '复制',
      BUTTON_BACK: '返回',
      FEEDBACK: '问题反馈',
      MSG_STARTING: '服务正在启动',
      MSG_STARTED: '服务已启动',
      MSG_STOPED: '服务已停止',
      MSG_COPIED: '已复制到剪切板',
      MSG_CONFIGERROR: '配置文件错误',
      MSG_CONFIGZERO: '无服务器配置',
      MSG_EXPORTED: '配置已导出',
      MSG_IMPORTED: '配置已导入',
      MSG_CANTREMOVE: '此项不能删除',
      MSG_ADDSERVER: '请添加服务配置',
      MSG_STOPFIRST: '请先停止当前服务',
      MSG_NOTFINISHED: '编辑未完成，无法保存'
    });

    var lang = localStorage.language || 'en';
    $translateProvider.preferredLanguage(lang);
  });
