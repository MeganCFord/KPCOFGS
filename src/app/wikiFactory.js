angular.module("Ident")
  .factory("WikiFactory", function($http, COLFactory) {


    function populateModal(nameToSend) {
      console.log("sending name to wikipedia now", nameToSend);
    }


    return {
      populateModal: populateModal
    };



  });//end of factory
