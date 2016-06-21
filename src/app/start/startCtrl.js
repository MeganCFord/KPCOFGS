angular.module("Ident")
  .controller("Start", function(FirebaseFactory, $scope, $location) {
    const start=this;

    start.startTaxa = "Animalia";
    start.iKnow=false;
    start.hideUserAnimal = true;
    start.userDescription = "";

    start.openTree = function() {
      $location.url(`/tree/${start.startTaxa}`);
    };


    start.uploadUserData = function() {
      //find the file. Angular doesn't really do this automatically.
      const input = document.querySelector('[type="file"]');
      const file = input.files[0];

      FirebaseFactory.uploadImage(file)
        .then(res => {
          start.userImage = res.downloadURL;
          start.hideUserAnimal = false;
          return res.downloadURL;
        })
        .then((userURL) => {
          firebase.database().ref("/currentUserObject").set({url: userURL, description: start.userDescription});
        }).then(() => {
          input.value="";
        });
    };


  });//end of module
  
