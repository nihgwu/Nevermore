// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'reaki' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'reaki.services' is found in services.js
// 'reaki.controllers' is found in controllers.js
angular.module('app', ['app.directives', 'app.services', 'app.controllers'])

.run(function($rootScope, NWService) {
})
/*
.config(function($stateProvider, $urlRouterProvider) {
	
  $stateProvider

    .state('app', {
      url: '/',
      templateUrl: 'index.html',
      controller: 'AppCtrl'
    })

  $urlRouterProvider.otherwise('/');

});
*/
