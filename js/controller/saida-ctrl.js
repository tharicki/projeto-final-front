(function( app, url ){
    'use strict';
    
    app.controller('SaidaController', Controller);
    
    function Controller($scope, SaidaService) {
        $scope.saidas = [];
        
        $scope.loadDados = function(){
            SaidaService.$all()
             .then(function( response ){
                $scope.saidas = response.data;
            }).catch(function(error){
                $scope.msgError = error.data || 'Erro ao buscar saidas do Servidor';
            });
        };
        
        $scope.salvarSaida = function(saida){
            SaidaService.$add(saida)
             .then(function( response ){
                 $scope.saidas.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar saida no servidor';
            });
        };      
        
        $scope.updateSaida = function(saida){
            SaidaService.$edit(saida)
             .then(function( response ){
                 var index = $scope.saidas.indexOf(saida);
                 $scope.saidas.splice(index,1);
                 $scope.saidas.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar saida (editar) no servidor';
            });
        };  
        
        $scope.deleteSaida = function(saida){
            SaidaService.$delete(saida)
             .then(function( response ){
                 var index = $scope.saidas.indexOf(saida);
                 $scope.saidas.splice(index,1);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao excluir saida no servidor';
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
