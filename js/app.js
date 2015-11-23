var urlREST = 'http://localhost:8080';

var appViaDagem = angular.module('appViaDagem', ['ngRoute'])    
    .config(function( $routeProvider ){
    
    $routeProvider
        .when('/clientes', {
            templateUrl: 'templates/clientes.html',
            controller: 'ClienteController'
        });
    
    
    $routeProvider.otherwise('/clientes');
    
});