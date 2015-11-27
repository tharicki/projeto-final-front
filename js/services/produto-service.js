(function( app, url){
    'use strict';
    app.service('ProdutoService',Service);
    
    function Service($http){
        function getAll(){
            return $http.get( url+'/produtos');
        }
        function add(produto){
            produto.id = null;
            return $http.post( url+'/produtos',produto);
        }
        
        function edit(produto){
            return $http.post( url+'/produtos/'+produto.id, produto);
        }
        function remove(produto){
            return $http.delete( url+'/produtos/'+produto.id);
        }
        
        return ({
            $all: getAll,
            $add: add,
            $edit: edit,
            $delete: remove
        })
    };
})( appViaDagem, urlREST);