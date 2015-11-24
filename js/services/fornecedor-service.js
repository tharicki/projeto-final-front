(function( app, url){
    'use strict';
    app.service('FornecedorService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/fornecedors');
        }
        function add(fornecedor){
            fornecedor.id = null;
            return $http.post( url+'/fornecedors',fornecedor);
        }
        
        function edit(fornecedor){
            return $http.post( url+'/fornecedors/'+fornecedor.id, fornecedor);
        }
        function remove(fornecedor){
            return $http.delete( url+'/fornecedors/'+fornecedor.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);