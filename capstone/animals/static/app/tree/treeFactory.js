angular.module("Ident")
  .factory("TreeFactory", function($http) {
    
    return {
      loadTree: (taxa_name) => {
        return $http.get(`http://localhost:8000/animals/tree/${taxa_name}`);
      }
    };

  }); 
