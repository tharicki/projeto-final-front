(function( app, url ){
    'use strict';
    
    app.controller('ClienteController', Controller);
    
    function Controller($scope, ClienteService) {
        $scope.clientes = [];
        
        $scope.loadDados = function(){
            ClienteService.$all()
             .then(function( response ){
                $scope.clientes = response.data;
            }).catch(function(error){
                $scope.msgError = error.data || 'Erro ao buscar clientes do Servidor';
            });
        };
        
        $scope.salvarCliente = function(cliente){
            ClienteService.$add(cliente)
             .then(function( response ){
                 $scope.clientes.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar cliente no servidor';
            });
        };      
        
        $scope.updateCliente = function(cliente){
            ClienteService.$edit(cliente)
             .then(function( response ){
                 var index = $scope.clientes.indexOf(cliente);
                 $scope.clientes.splice(index,1);
                 $scope.clientes.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar cliente (editar) no servidor';
            });
        };  
        
        $scope.deleteCliente = function(cliente){
            ClienteService.$delete(cliente)
             .then(function( response ){
                 var index = $scope.clientes.indexOf(cliente);
                 $scope.clientes.splice(index,1);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao excluir cliente no servidor';
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
