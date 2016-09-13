angular.module("Ident")

  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyCURkkPgQCr7Z6tyaAUP38_wpKqkEDLiwk",
      authDomain: "animal-identification.firebaseapp.com",
      databaseURL: "https://animal-identification.firebaseio.com",
      storageBucket: "animal-identification.appspot.com"
    });
  })
  
  .factory("UserObjectFactory", function($http, $timeout) {

    //upload image on start page.
    function uploadImage(file, path=file.name) {
      return $timeout().then(() => (
        new Promise((resolve, reject) => {
          const uploadTask = firebase.storage().ref()
            .child(path).put(file);

          uploadTask.on("state_changed",
            null,
            reject,
            () => resolve(uploadTask.snapshot)
          );
        })
      ));
    }
  
    return {
      uploadImage: uploadImage,
      clearUserObject: () => {
        return $http.delete("https://animal-identification.firebaseio.com/currentUserObject/.json");
      },
      getUserObject: () => {
        return $http.get("https://animal-identification.firebaseio.com/currentUserObject.json");
      }, 
      publishAnimal: (name) => {
        return $http.get(`http://127.0.0.1:8000/animals/publish/${name}`);
      }
    };

  });

  

  
 
