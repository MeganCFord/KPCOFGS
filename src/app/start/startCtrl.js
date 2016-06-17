angular.module("Ident")
  .controller("Start", function(COLFactory, $scope, $location) {
    const start=this;
    start.title="hello world (start page)";

    start.startTaxa = "Animalia";

    start.openTree = function() {
      COLFactory.COLforTaxa(start.startTaxa)
        .then(() => {$location.url("/tree");});
    };


  });//end of module
