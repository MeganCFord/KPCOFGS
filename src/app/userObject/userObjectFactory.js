angular.module("Ident")

  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyCURkkPgQCr7Z6tyaAUP38_wpKqkEDLiwk",
      authDomain: "animal-identification.firebaseapp.com",
      databaseURL: "https://animal-identification.firebaseio.com",
      storageBucket: "animal-identification.appspot.com"
    });
  })
  
  .factory("UserObjectFactory", function($http, $timeout, TreeFactory, AnswerFactory) {

    let userAnimal = {};

    //clears the user object on restart. 
    function clearUserObject () {
      return $http({
        method: "DELETE", 
        url: "https://animal-identification.firebaseio.com/currentUserObject/.json"
      });
    }

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


    function buildUserObject(route) {
      return TreeFactory.getMasterTaxa(route)
        .then((res) => {
          //get the master 'question'
          AnswerFactory.getSpecialData(res.name)
          .then((res)=> {
            userAnimal.masterQuestion = res.question;
          });
          return Promise.resolve(res);

        }).then((res)=>{
          //get the 'questions' for all the taxa above the current taxa.
          userAnimal.answerArray = [];
          return Promise.all(res.classification.map(function(parentTaxa) {
            return AnswerFactory.getSpecialData(parentTaxa.name)
              .then((res) => {
                userAnimal.answerArray.push(res.question);
              });
          }))
          //update the firebase object, then get it for the page.
          .then(()=> {
            return sendAnswerArray(userAnimal);
          }).then(()=> {
            getUserObject();
          }); 
        });   
    }
   
    // I've separated the master question for styling purposes.
    function sendAnswerArray(userAnimal) {
      return $http({
        method: "PUT", 
        url: `https://animal-identification.firebaseio.com/currentUserObject/cumulative.json`,
        data: {masterQuestion: userAnimal.masterQuestion, answers: userAnimal.answerArray}
      }).then((res) => {
        Promise.resolve(res);
      }, (e) => {
        Promise.reject(e);
      });
    }

    //runs this after the array is sent.
    function getUserObject() {
      return $http({
        method: "GET", 
        url: "https://animal-identification.firebaseio.com/currentUserObject.json"
      }).then((res)=>{
        userAnimal = res.data;
        return userAnimal;
      });
    }
    
    function getLoadedUserAnimal () {
      return userAnimal;
    }

    //Public Functions
    return {
      clearUserObject: clearUserObject,
      uploadImage: uploadImage,
      buildUserObject: buildUserObject, 
      getLoadedUserAnimal: getLoadedUserAnimal
    };

  });

  

  
 
