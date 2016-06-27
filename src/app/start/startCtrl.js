angular.module("Ident")
  .controller("Start", function(FirebaseFactory, FeedFactory, $scope, $timeout, $location) {
    const start=this;

    start.userDescription = "";
    start.currentFileName = "No File Selected";
    start.step =0;   
   

    //displays file name. 
    $scope.photoChanged = function(files) {
      if (files !== null ) {
        console.log("files", files );
        start.currentFileName = files[0].name;
        $scope.$apply();
      }
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
          start.currentFileName = "No File Selected";
          start.step = 2;
        });
    };

    //'Get Started' button.
    start.openTree = function() {
      $timeout().then(()=> {
        return FirebaseFactory.addStartingQuestion('Animalia');
      }).then(()=> {
        $location.url(`/tree/Animalia`);
      });
    };

  });//end of module
  
