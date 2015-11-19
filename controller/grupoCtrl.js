angular.module('app.crud-grupo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {    
     $routeProvider.when('/grupos', {
         templateUrl : 'template/grupo.html',
         controller: 'GrupoCtrl'
     });
}])

.service('GrupoSrv',['$window', '$q', function($window, $q){
    var keyStorage = 'lp3-crud::grupo:';
    
    //Retorna todos os grupos armazenados no localstorage
    this.all = function() {
        return angular.fromJson($window.localStorage[keyStorage] || []);
    };
    
    //Remover  um grupo no localstorage
    this.delete = function(grupos) {
        var deferred = $q.defer();
        
        //Filtra, deixando apena os que não serão excluídos
        var filtrados = grupos.filter(function (grupo) {
            if (!grupo.selecionado)
                return grupo;  
        });
        
        //Devolve novamente para a storage
        $window.localStorage[keyStorage] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        //retorna a promessa
        return deferred.promise;
    };
    
    //Adicionar um grupo no localstorage
    this.save = function(grupo) {
        var deferred = $q.defer();
        
        //Pega os grupos
        var grupos = this.all();
        //Adiciona o grupo passado por parâmetro
        grupos.push(grupo);
        //Devolve novamente para a storage
        $window.localStorage[keyStorage] = angular.toJson(grupos);
        deferred.resolve(grupo);
        
        //retorna a promessa
        return deferred.promise;
    };
}])

.controller('GrupoCtrl', ['$scope','$location','GrupoSrv', function ($scope, $location, Service) {    
    $scope.activetab = $location.path();
    $scope.grupos = Service.all();
    
    //Verifica se está selecionado
    $scope.isSelecionado = function(grupos) {
        return grupos.some(function (grupo) {
            return grupo.selecionado;    
        });
    };
    
    //Ordenar colunas
    $scope.ordernarPor = function(campo) {
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
 
    //Adicionar
    $scope.adicionar = function(grupo) {
        Service.save(grupo).then(function(data){
            $scope.grupos.push(angular.copy(data)); 
            delete $scope.grupo;
            $scope.grupoForm.$setPristine(); 
        });        
    };
    
    //Remover
    $scope.remover = function (grupos) {        
        Service.delete(grupos).then(function(data){
            $scope.grupos = data;
        });
    };
}]);