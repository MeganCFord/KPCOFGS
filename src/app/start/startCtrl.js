angular.module("Ident")
  .controller("Start", function(COLFactory, $routeParams, $scope) {
    const start=this;

    start.title="hello world (start page)";

    start.openTree = function(nameToSend) {
      console.log("next sibling", $scope );
      // $scope.$$nextSibling.tree.loadSubtaxa(nameToSend);
      // $location.url("/tree");


    };
  });//end of module
