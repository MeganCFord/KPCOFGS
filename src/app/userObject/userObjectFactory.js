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


    function buildUserObject() {
      return TreeFactory.getMasterTaxa()
        .then((res) => {
          res.answerArray = [];
          return Promise.all(res.classification.map(function(parentTaxa) {
            return AnswerFactory.getSpecialData(parentTaxa.name)
              .then((res) => {
                res.answerArray.push(res.answer);
                console.log("answer array", res.answerArray);
              });
          }))
          .then(()=> {
            return AnswerFactory.getSpecialData(userAnimal.name)
              .then((res)=> {
                res.answerArray.push(res.answer);
                console.log("answer array completed", res.answerArray);
              });
          })
          .then(()=> {
            userAnimal.answersArray = res.answerArray;
            return sendAnswerArray(res.answerArray);
          }).then(()=> {
            getUserObject();
          }); 
        });   
    }
   
    //send answer array to user object after array has been built in answer factory.  
    function sendAnswerArray(answerArray) {
      return $http({
        method: "PUT", 
        url: `https://animal-identification.firebaseio.com/currentUserObject/answeredQuestions/.json`,
        data: {answer: answerArray}
      }).then((res) => {
        Promise.resolve(res);
      }, (e) => {
        Promise.reject(e);
      });
    }

    let userAnimal = {};

    //run this after the array is sent.
    function getUserObject() {
      return $http({
        method: "GET", 
        url: "https://animal-identification.firebaseio.com/currentUserObject.json"
      }).then((res)=>{
        userAnimal = res.data;
        console.log("user Animal Object: ", userAnimal );
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
      sendAnswerArray: sendAnswerArray,
      getUserObject: getUserObject, 
      getLoadedUserAnimal: getLoadedUserAnimal
    };

  });

  

  
 
