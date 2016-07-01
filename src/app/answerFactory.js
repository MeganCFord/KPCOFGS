angular.module("Ident")
  .factory("AnswerFactory", function($http) {

 //adds my question to the current taxa and the subtaxa on the page. 
    function getSpecialData (nameToSend) {
      if (nameToSend !== null) {
        return $http({
          method: "GET", 
          url: `https://animal-identification.firebaseio.com/specialData/${nameToSend}/.json`
        }).then((res) => {
          if (res.data ===null) {
            return {
              question: `is a ${nameToSend}.`,
              //TODO: change 'enableMe' default to false once I get enough questions loaded into firebase.
              enableMe: true
            };
          } else {
            return res.data;
          }
        });
      }
    }

    //public functions 
    return {
      getSpecialData: getSpecialData
    };
  });
