var urlREST = 'http://localhost:8080';

var appViaDagem = angular.module('appViaDagem', ['ngRoute'])    
    .config(function( $routeProvider ){
    
    $routeProvider
        .when('/clientes', {
            templateUrl: 'template/clientes.html',
            controller: 'ClienteController'
        }).when('/fornecedores', {
            templateUrl: 'template/fornecedores.html',
            controller: 'FornecedorController'
        }).when('/tarefas', {
            templateUrl: 'template/tarefas.html',
            controller: 'TarefaController'
        }).when('/produtos', {
            templateUrl: 'template/produtos.html',
            controller: 'ProdutoController'
        }).when('/agendas', {
            templateUrl: 'template/agendas.html',
            controller: 'AgendaController'
        }).when('/saidas', {  
            templateUrl: 'template/saidas.html',
            controller: 'SaidaController'
        });
    
    $routeProvider.otherwise('/clientes');
    
});