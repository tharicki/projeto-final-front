(function( app, url ){
    'use strict';
    
    app.controller('FornecedorController', Controller);
    
    function Controller($scope, FornecedorService) {
        $scope.fornecedores = [];
        
        $scope.loadDados = function(){
            FornecedorService.$all()
             .then(function( response ){
                $scope.fornecedores = response.data;
            }).catch(function(error){
                $scope.msgError = error.data || 'Erro ao buscar fornecedores do Servidor';
            });
        };
        
        $scope.salvarFornecedor = function(fornecedor){
            FornecedorService.$add(fornecedor)
             .then(function( response ){
                 $scope.fornecedores.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar fornecedor no servidor';
            });
        };      
        
        $scope.updateFornecedor = function(fornecedor){
            FornecedorService.$edit(fornecedor)
             .then(function( response ){
                 var index = $scope.fornecedores.indexOf(fornecedor);
                 $scope.fornecedores.splice(index,1);
                 $scope.fornecedores.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar fornecedor (editar) no servidor';
            });
        };  
        
        $scope.deleteFornecedor = function(fornecedor){
            FornecedorService.$delete(fornecedor)
             .then(function( response ){
                 var index = $scope.fornecedores.indexOf(fornecedor);
                 $scope.fornecedores.splice(index,1);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao excluir fornecedor no servidor';
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