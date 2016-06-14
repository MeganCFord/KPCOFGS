angular.module("Ident", ["ngRoute"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        templateUrl: "app/identer.html",
        controller: "Identer", 
        controllerAs: "identer"
      })
      .otherwise("/");
  })

  .controller("Identer", function($scope, COLFactory) {

    const identer = this;

    $scope.title="hello world (angular)";

    COLFactory.getAPIURL();

  })

  .factory("COLFactory", function($http) {

    return {
      //tried animalia and did not get child taxa...
    
      getAPIURL: () => {
        return  $http({
          method: "GET", 
          url: "http://www.catalogueoflife.org/col/webservice?name=Animalia&format=json&response=full"
        }).then( (res) => {
          console.log("response", res.data );
        }, (e) => {
          console.log("error", e );
        });
      }
    };//end of return
  });


const breakup = function() {
  let relationship = ["Megan", "Michael"];
  relationship.splice("Michael", 1);
  relationship.push("loneliness");
  return relationship;
};
