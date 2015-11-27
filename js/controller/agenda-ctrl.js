(function( app, url ){
    'use strict';
    
    app.controller('AgendaController', Controller);
    
    function Controller($scope, AgendaService) {
        $scope.agendas = [];
        
        $scope.loadDados = function(){
            AgendaService.$all()
             .then(function( response ){
                $scope.agendas = response.data;
            }).catch(function(error){
                $scope.msgError = error.data || 'Erro ao buscar horários da agenda do Servidor';
            });
        };
        
        $scope.salvarAgenda = function(agenda){
            AgendaService.$add(agenda)
             .then(function( response ){
                 $scope.agendas.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar horários da agenda no servidor';
            });
        };      
        
        $scope.updateAgenda = function(agenda){
            AgendaService.$edit(agenda)
             .then(function( response ){
                 var index = $scope.agendas.indexOf(agenda);
                 $scope.agendas.splice(index,1);
                 $scope.agendas.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar horários da agenda (editar) no servidor';
            });
        };  
        
        $scope.deleteAgenda = function(agenda){
            AgendaService.$delete(agenda)
             .then(function( response ){
                 var index = $scope.agendas.indexOf(agenda);
                 $scope.agendas.splice(index,1);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao excluir horários da agenda no servidor';
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
