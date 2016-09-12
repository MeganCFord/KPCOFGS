angular.module("Ident")
  .factory("TreeFactory", function($http) {
  
    let currentTaxa = {};

    return {
      loadTree: (taxa_name) => {
        return $http.get(`http://localhost:8000/animals/tree/${taxa_name}`)
        .then((res)=> {
          console.log("animal info", res.data);
          currentTaxa = res.data;
        });
      },
      loadSpecies: (taxa_name) => {
        return $http.get(`http://localhost:8000/animals/species/${taxa_name}`)
        .then((res)=> {
          console.log("species info", res.data);
          currentTaxa = res.data;
        });
      },
      gimmeTheTree: () => {
        return currentTaxa;
      }
    };

  }); 
