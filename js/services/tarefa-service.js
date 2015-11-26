(function( app, url){
    'use strict';
    app.service('TarefaService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/tarefas');
        }
        function add(tarefa){
            fornecedor.id = null;
            return $http.post( url+'/tarefas',tarefa);
        }
        
        function edit(tarefa){
            return $http.post( url+'/tarefas/'+tarefa.id, tarefa);
        }
        function remove(tarefa){
            return $http.delete( url+'/tarefas/'+tarefa.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);