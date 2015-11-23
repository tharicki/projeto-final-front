(function( app, url){
    'use strict';
    app.service('ClienteService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/clientes');
        }
        function add(cliente){
            cliente.id = null;
            return $http.post( url+'/clientes',cliente);
        }
        
        function edit(cliente){
            return $http.post( url+'/clientes/'+cliente.id, cliente);
        }
        function remove(cliente){
            return $http.delete( url+'/clientes/'+cliente.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);