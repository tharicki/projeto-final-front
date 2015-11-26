(function( app, url ){
    'use strict';
    
    app.controller('TarefaController', Controller);
    
    function Controller($scope, TarefaService) {
        $scope.tarefas = [];
        
        $scope.loadDados = function(){
            TarefaService.$all()
             .then(function( response ){
                $scope.tarefas = response.data;
            }).catch(function(error){
                $scope.msgError = error.data || 'Erro ao buscar tarefas do Servidor';
            });
        };
        
        $scope.salvarTarefa = function(tarefa){
            TarefaService.$add(tarefa)
             .then(function( response ){
                 $scope.tarefas.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar tarefa no servidor';
            });
        };      
        
        $scope.updateTarefa = function(tarefa){
            TarefaService.$edit(tarefa)
             .then(function( response ){
                 var index = $scope.tarefas.indexOf(tarefa);
                 $scope.tarefas.splice(index,1);
                 $scope.tarefas.push(response.data);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao gravar tarefa (editar) no servidor';
            });
        };  
        
        $scope.deleteTarefa = function(tarefa){
            TarefaService.$delete(tarefa)
             .then(function( response ){
                 var index = $scope.tarefas.indexOf(tarefa);
                 $scope.tarefas.splice(index,1);
            }).catch(function(error){
                $scope.msgError = error.data || 'Falha ao excluir tarefa no servidor';
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