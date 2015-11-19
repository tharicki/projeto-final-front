angular.module('app.crud', ['ngRoute','app.crud-grupo','app.crud-produto'])
    
.config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({redirectTo: '/grupos'});
}]);