angular.module("Ident")
  .controller("Start", function(COLFactory, $scope, $location) {
    const start=this;

    start.startTaxa = "Animalia";
    start.iKnow=false;

    start.openTree = function() {
        $location.url(`/tree/${start.startTaxa}`);
    };


  });//end of module
