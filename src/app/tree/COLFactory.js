angular.module("Ident")
  .factory("COLFactory", function($http, FirebaseFactory, InfoFactory) {

    let currentTaxaData = null;

    function getCurrentTaxa () {
      return currentTaxaData;
    }


    function COLforTaxa (nameToSend) {
      console.log("sending new taxa name", nameToSend );
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        currentTaxaData = res.data.results ? 
           res.data.results[0] : res.data;
           console.log("current taxa data has been set", currentTaxaData );
        //find out if the current taxa is a stub or not. 
        findOutIfSpecies();
        
        return currentTaxaData;
      
      }, (e) => {
        console.err(e);
      }).then((data) => {

        loadEitherQuestionsOrInfo(data);
        
        //KEEP THIS HERE. 
        return Promise.resolve(data);
        // 
      }).then((data) => {
        currentTaxaData = data;
        return currentTaxaData;
      });//end of .then. 
    }//end of COLforTaxa


    function findOutIfSpecies () {
      console.log("current taxa in species finder", currentTaxaData );
      if (currentTaxaData.rank === "Family") {
        currentTaxaData.stub = true;
      } else {
        currentTaxaData.stub = false;
      }
      if (currentTaxaData.child_taxa[0].rank === "Family" || currentTaxaData.child_taxa[0].rank === "Genus" || currentTaxaData.child_taxa[0].rank === "Species" || currentTaxaData.child_taxa[0].rank === "Infraspecies" ) {
        currentTaxaData.traversable = false;
      } else {
        currentTaxaData.traversable = true;
      }
    }
     

    function loadEitherQuestionsOrInfo (data) {
      //if we're going to continue traversing, add the questions to the subtaxa. 
      if (data.stub ===false) {
        return Promise.all(data.child_taxa.map((cardInfo) => {
          return FirebaseFactory.getSpecialData(cardInfo.name)
          .then((res) => {
            cardInfo.specialData = res;
            return cardInfo;
          });//end of firebaseFactory .then
        })).then(() => {
          return data;
        });//end of .then for promise.all
        //if we're not going to continue traversing, add the modal info to the subtaxa.
      } else {
        return Promise.all(data.child_taxa.map((cardInfo) => {
          return InfoFactory.populateTaxaCard(cardInfo.name)
          .then((res)=> {
            cardInfo.modalData = res;
            return cardInfo;
          });//end of infoFactory.then
        })).then(()=> {
          return data;
        });//end of .then for promise.all
      }//end of if else statement

    }
    
    //public functions
    return {
      COLforTaxa: COLforTaxa, 
      getCurrentTaxa: getCurrentTaxa
      
    };//end of return

  }); //end of factory
