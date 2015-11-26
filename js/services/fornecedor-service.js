(function( app, url){
    'use strict';
    app.service('FornecedorService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/fornecedores');
        }
        function add(fornecedor){
            fornecedor.id = null;
            return $http.post( url+'/fornecedores',fornecedor);
        }
        
        function edit(fornecedor){
            return $http.post( url+'/fornecedores/'+fornecedor.id, fornecedor);
        }
        function remove(fornecedor){
            return $http.delete( url+'/fornecedores/'+fornecedor.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);