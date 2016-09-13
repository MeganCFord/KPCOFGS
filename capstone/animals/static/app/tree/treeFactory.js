angular.module("Ident")
  .factory("TreeFactory", function($http) {
  
    let currentTaxa = {};

    return {
      loadTree: (taxa_name) => {
        return $http.get(`http://meganfordcodes.com/animals/tree/${taxa_name}`)
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
