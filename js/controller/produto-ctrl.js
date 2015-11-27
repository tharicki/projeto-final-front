(function( app, url ){
    'use strict';
    
    app.controller('ProdutoController', Controller);
    
    function Controller($scope, ProdutoService) {
        $scope.produtos = [];
        
        $scope.loadDados = function(){
            ProdutoService.$all()
             .then(function( response ){
                $scope.produtos = response.data;
            }).catch(function(error){
                $scope.msgError = error.data || 'Erro ao buscar produtos do Servidor';
            });
        };
        
        $scope.salvarProduto = function(produto){
            ProdutoService.$add(produto)
             .then(function( response ){
                 $scope.produtos.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar produto no servidor';
            });
        };      
        
        $scope.updateProduto = function(produto){
            ProdutoService.$edit(produto)
             .then(function( response ){
                 var index = $scope.produtos.indexOf(produto);
                 $scope.produtos.splice(index,1);
                 $scope.produtos.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar produto (editar) no servidor';
            });
        };  
        
        $scope.deleteProduto = function(produto){
            ProdutoService.$delete(produto)
             .then(function( response ){
                 var index = $scope.produtos.indexOf(produto);
                 $scope.produtos.splice(index,1);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao excluir produto no servidor';
            });
        };  
        
        $scope.loadDados();
        
        //Verifica se está selecionado
        $scope.isSelecionado = function(projetos) {
            return projetos.some(function (projeto) {
                return projeto.selecionado;    
            });
        };

        //Ordenar colunas
        $scope.ordernarPor = function(campo) {
            $scope.criterioOrdenacao = campo;
            $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
        };
    };
    
})( appViaDagem, urlREST );
