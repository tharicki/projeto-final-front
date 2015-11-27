(function( app, url){
    'use strict';
    app.service('SaidaService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/saidas');
        }
        function add(saida){
            saida.id = null;
            return $http.post( url+'/saidas',saida);
        }
        
        function edit(saida){
            return $http.post( url+'/saidas/'+saida.id, saida);
        }
        function remove(saida){
            return $http.delete( url+'/saidas/'+saida.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);