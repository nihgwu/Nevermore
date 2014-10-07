angular.module('app.filters', [])

.filter('html', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  }
})
