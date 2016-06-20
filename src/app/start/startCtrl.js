angular.module("Ident")
  .controller("Start", function(COLFactory, FirebaseFactory, $scope, $location) {
    const start=this;

    start.startTaxa = "Animalia";
    start.iKnow=false;
    start.myAnimalReference=null;
    start.userimageURLs = [];
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
          start.userimageURLs.push(res.downloadURL);
          //TODO: make the image show up on the start page.
          console.log("user images", start.userimageURLs );
          return res.downloadURL;
        })
        .then((userURL) => {
          firebase.database().ref("/currentUserObject").set({url: userURL, description: start.userDescription});
        });
    };


  });//end of module
