angular.module("Ident")
  .controller("UserObject", function(UserObjectFactory, $timeout) {
    const user = this;

    user.loadUserAnimal = () => {
      $timeout().then(() => {user.userAnimal = UserObjectFactory.getLoadedUserAnimal();
      console.log("user animal: ", user.userAnimal);
      });
    };
    user.loadUserAnimal();


  });//end of controller
