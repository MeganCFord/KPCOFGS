angular.module("Ident")
  .factory("TreeFactory", function($http) {
  
    let currentTaxa = {};

    return {
      loadTree: (taxa_name) => {
        return $http.get(`http://localhost:8000/animals/tree/${taxa_name}`)
        .then((res)=> {
          console.log("res in factory", res.data );
          currentTaxa = res.data;
        });
      },
      gimmeTheTree: () => {
        return currentTaxa;
      }
    };

  }); 
