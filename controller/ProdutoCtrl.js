angular.module('app.crud-produto', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {    
     $routeProvider.when('/produtos', {
         templateUrl : 'template/produto.html',
         controller: 'ProdutoCtrl'
     });
}])

.service('ProdutoSrv',['$window', '$q', function($window, $q){
    var keyStorage = 'lp3-crud::produto:';
    
    //Retorna todos os produtos armazenados no localstorage
    this.all = function() {
        return angular.fromJson($window.localStorage[keyStorage] || []);
    };
    
    //Remover  um produto no localstorage
    this.delete = function(produtos) {
        var deferred = $q.defer();
        
        //Filtra, deixando apena os que não serão excluídos
        var filtrados = produtos.filter(function (produto) {
            if (!produto.selecionado)
                return produto;  
        });
        
        //Devolve novamente para a storage
        $window.localStorage[keyStorage] = angular.toJson(filtrados);
        deferred.resolve(filtrados);
        
        //retorna a promessa
        return deferred.promise;
    };
    
    //Adicionar um produto no localstorage
    this.save = function(produto) {
        var deferred = $q.defer();
        
        //Pega os produtos
        var produtos = this.all();
        //Adiciona o produto passado por parâmetro
        produtos.push(produto);
        //Devolve novamente para a storage
        $window.localStorage[keyStorage] = angular.toJson(produtos);
        deferred.resolve(produto);
        
        //retorna a promessa
        return deferred.promise;
    };
}])

.controller('ProdutoCtrl', ['$scope','$location','ProdutoSrv', 'GrupoSrv', function ($scope, $location, Service, GrupoSrv) {    
    $scope.activetab = $location.path();
    $scope.grupos = GrupoSrv.all();
    $scope.produtos = Service.all();
    
    //Verifica se está selecionado
    $scope.isSelecionado = function(produtos) {
        return produtos.some(function (produto) {
            return produto.selecionado;    
        });
    };
    
    //Ordenar colunas
    $scope.ordernarPor = function(campo) {
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
 
    //Adicionar
    $scope.adicionar = function(produto) {
        Service.save(produto).then(function(data){
            $scope.produtos.push(angular.copy(data)); 
            delete $scope.produto;
            $scope.produtoForm.$setPristine(); 
        });        
    };
    
    //Remover
    $scope.remover = function (produtos) {        
        Service.delete(produtos).then(function(data){
            $scope.produtos = data;
        });
    };
}]);