angular.module("Ident")

  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyCURkkPgQCr7Z6tyaAUP38_wpKqkEDLiwk",
      authDomain: "animal-identification.firebaseapp.com",
      databaseURL: "https://animal-identification.firebaseio.com",
      storageBucket: "animal-identification.appspot.com"
    });
  })
  
  .factory ("FirebaseFactory", function($http, $timeout) {

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

          uploadTask.on('state_changed',
            null,
            reject,
            () => resolve(uploadTask.snapshot)
          );
        })
      ));
    }
    //runs between START page and TREE page to add the subtaxa question to the user object. 
    function addStartingQuestion (nameToSend) {
      return getSpecialData(nameToSend)
        .then((res) => {
          return sendUserAnswer(nameToSend, res.question);
        });
    }

    //send selected subtaxa to user object.
    function sendUserAnswer(filepath, answer) {
      return $http({
        method: "PUT", 
        url: `https://animal-identification.firebaseio.com/currentUserObject/answeredQuestions/${filepath}/.json`,
        data: {answer: answer}
      }).then((res) => {
        console.log("success in sending user answer");
      }, 
      (e) => {
        console.log("error", e );
      });
    }

    let whatIKnowAboutMyAnimalSoFar = {};

    //runs every time the tree or species pages load. GETTER ONLY- also runs as part of addStartingQuestion
    function getUserObject() {
      console.log("starting to get user object" );
      return $http({
        method: "GET", 
        url: "https://animal-identification.firebaseio.com/currentUserObject.json"
      }).then((res)=>{
        whatIKnowAboutMyAnimalSoFar = res.data;
        return whatIKnowAboutMyAnimalSoFar;
      });   
    }

    function getWhatIKnow () {
      return whatIKnowAboutMyAnimalSoFar;
    }

    
    //adds my question/enable or disable boolean to the subtaxa on the page. 
    function getSpecialData (nameToSend) {
      if (nameToSend !== null) {
        return $http({
          method: "GET", 
          url: `https://animal-identification.firebaseio.com/specialData/${nameToSend}/.json`
        }).then((res) => {
          if (res.data ===null) {
            return {
              question: `is a ${nameToSend}. see 'more info'.`,
              enableMe: true
            };
          } else {
            return res.data;
          }//end of if res is null statement.
        });//end of get special data .then
      }else {
        console.err("WTF why is the name to send null");
      }//end of ifNameToSend !== null
    }
    
    function deleteLastAnswer(nameToDelete) {
      return $http({
        method: "DELETE", 
        url: `https://animal-identification.firebaseio.com/currentUserObject/answeredQuestions/${nameToDelete}.json`
      });
    }




    //Public Functions
    return {
      deleteLastAnswer: deleteLastAnswer,
      sendUserAnswer: sendUserAnswer,
      addStartingQuestion: addStartingQuestion,
      uploadImage: uploadImage,
      getSpecialData: getSpecialData,
      getWhatIKnow: getWhatIKnow, 
      getUserObject: getUserObject, 
      clearUserObject: clearUserObject
    };

  });

  

  
 
