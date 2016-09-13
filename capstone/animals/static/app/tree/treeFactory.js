angular.module("Ident")
  .factory("TreeFactory", function($http) {
  
    let currentTaxa = {};

    return {
      loadTree: (taxa_name) => {
        return $http.get(`http://127.0.0.1:8000/animals/tree/${taxa_name}`)
        .then((res)=> {
          // console.log("animal info", res.data);
          currentTaxa = res.data;
        });
      },
      gimmeTheTree: () => {
        return currentTaxa;
      }
    };

  }); 
