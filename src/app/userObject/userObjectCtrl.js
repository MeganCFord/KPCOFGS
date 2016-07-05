angular.module("Ident")
  .controller("UserObject", function(UserObjectFactory, $timeout, $uibModal) {
    const user = this;

    user.loadUserAnimal = () => {
      $timeout().then(() => {user.userAnimal = UserObjectFactory.getLoadedUserAnimal();
      console.log("user animal: ", user.userAnimal);
      });
    };
    user.loadUserAnimal();


    //loads on "more info" button click to open modal and get subtaxa info. 
    user.openModal = (scientificName) => {


      const modalInstance = $uibModal.open({
        size: "lg",
        templateUrl: "app/modal/infoModal.html", 
        controller: "modalController",
        controllerAs: "modalController", 
        resolve: { 
          data: function (InfoFactory) {
            return InfoFactory.populateTaxaCard(scientificName);
          }, 
          buttons: false
        }//end of resolve  
      });//end of modal.open
    }; //end of tree.openModal


  });//end of controller
