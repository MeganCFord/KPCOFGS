angular.module("Ident")
  .controller("Start", function(COLFactory, $scope, $location) {
    const start=this;

    start.startTaxa = "Animalia";
    start.iKnow=false;

    start.openTree = function() {
      COLFactory.COLforTaxa(start.startTaxa)
        .then(() => {$location.url("/tree");});
    };


  });//end of module
