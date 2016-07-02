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
    let currentMasterTaxa = {};

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
          currentMasterTaxa = res;
          
          //get/set the master 'question'
          return AnswerFactory.getSpecialData(currentMasterTaxa.name)
          .then((res)=> {
            userAnimal.masterAnswer = res.question;
            return sendMasterAnswer(userAnimal.masterAnswer);
          });

        }).then(()=>{
          //get the 'questions' for all the taxa above the current taxa.
          userAnimal.answerArray = [];
          return Promise.all(currentMasterTaxa.classification.map(function(parentTaxa) {
            return AnswerFactory.getSpecialData(parentTaxa.name)
              .then((res) => {
                return userAnimal.answerArray.push(res.question);
              });
          }))
          //update the firebase object, then get it for the page.
          .then(()=> {
            return sendAnswerArray(userAnimal.answerArray);
          }).then(()=> {
            return getUserObject();
          }); 
        });   
    }
   

    function sendMasterAnswer(answer) {
      return $http({
        method: "PATCH", 
        url: `https://animal-identification.firebaseio.com/currentUserObject.json`,
        data: {masterQuestion: answer}
      }).then((res) => {
        Promise.resolve(res);
      }, (e) => {
        Promise.reject(e);
      });
    }

    // I've separated the master question for styling purposes for now.
    function sendAnswerArray(array) {
      return $http({
        method: "PATCH", 
        url: `https://animal-identification.firebaseio.com/currentUserObject.json`,
        data: {questionArray: array}
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

  

  
 
