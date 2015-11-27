(function( app, url){
    'use strict';
    app.service('AgendaService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/agendas');
        }
        function add(agenda){
            agenda.id = null;
            return $http.post( url+'/agendas',agenda);
        }
        
        function edit(agenda){
            return $http.post( url+'/agendas/'+agenda.id, agenda);
        }
        function remove(agenda){
            return $http.delete( url+'/agendas/'+agenda.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);