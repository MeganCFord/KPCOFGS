angular.module("Ident")
  .controller("UserObject", function(FirebaseFactory, $timeout) {
    const user = this;

    user.helloWorld = "hello World";

    user.loadUserAnimal = () => {
      $timeout().then(() => {user.userAnimal = FirebaseFactory.getWhatIKnow();
      console.log("user animal: ", user.userAnimal);
      });
    };
    user.loadUserAnimal();

  });//end of controller
