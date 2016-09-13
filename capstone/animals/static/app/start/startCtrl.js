angular.module("Ident")
  .controller("Start", function(UserObjectFactory, FeedFactory, $scope) {
    const start=this;

    UserObjectFactory.clearUserObject();

    start.userDescription = "";
    start.currentFileName = "No File Selected";
    start.step =0;   
   

    //displays file name on DOM before upload. 
    $scope.photoChanged = function(files) {
      if (files !== null ) {
        start.currentFileName = files[0].name;
        $scope.$apply();
      }
    };

    start.uploadUserData = function() {
      //find the file. Angular doesn't really do this automatically.
      const input = document.querySelector('[type="file"]');
      const file = input.files[0];

      UserObjectFactory.uploadImage(file)
        .then(res => {
          start.userImage = res.downloadURL;
          start.step = 2;
          return res.downloadURL;
        })
        .then((userURL) => {
          firebase.database().ref("/currentUserObject").set({url: userURL, description: start.userDescription});
        }).then(() => {
          start.currentFileName = "No File Selected";
        });
    };

  });//end of module
  
