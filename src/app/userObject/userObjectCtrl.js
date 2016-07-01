angular.module("Ident")
  .controller("UserObject", function(FirebaseFactory, WikiFactory, $timeout) {
    const user = this;

    //http GETTER runs in resolve.
    user.loadUserAnimal = () => {
      $timeout().then(() => {user.userAnimal = FirebaseFactory.getWhatIKnow();
      console.log("user animal: ", user.userAnimal);
      });
    };
    user.loadUserAnimal();

    WikiFactory.getWikiData("Mollusca");


  });//end of controller
