angular.module("Ident")
  .factory("TreeFactory", function($http, AnswerFactory, InfoFactory) {

    let currentTaxaData = null;

    function getLoadedCurrentTaxa () {
      return currentTaxaData;
    }

    function getMasterTaxa(nameToSend) {
      // console.log("sending new taxa name", nameToSend );
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        currentTaxaData = res.data.results ? 
           res.data.results[0] : res.data;
        
        return currentTaxaData;
      
      }, (e) => {
        Promise.reject(e);
      });
    }

    function findOutIfSpecies () {
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
     

    function loadEitherQuestionsOrInfo () {
      //if we're going to continue traversing, add the questions to the subtaxa. 
      if (currentTaxaData.stub ===false) {
        return Promise.all(currentTaxaData.child_taxa.map((cardInfo) => {
          return AnswerFactory.getSpecialData(cardInfo.name)
          .then((res) => {
            cardInfo.specialData = res;
            return cardInfo;
          });//end of firebaseFactory .then
        })).then(() => {
          return currentTaxaData;
        });//end of .then for promise.all
        //if we're not going to continue traversing, add the modal info to the subtaxa.
      } else {
        return Promise.all(currentTaxaData.child_taxa.map((cardInfo) => {
          return InfoFactory.populateTaxaCard(cardInfo.name)
          .then((res)=> {
            cardInfo.modalData = res;
            return cardInfo;
          });//end of infoFactory.then
        })).then(()=> {
          return currentTaxaData;
        });//end of .then for promise.all
      }//end of if else statement

    }

    function buildTheTree (nameToSend) {
      return getMasterTaxa(nameToSend).then(() => {
        return findOutIfSpecies();
      }).then(() => {
        return loadEitherQuestionsOrInfo();
      }); 
    }//end of COLforTaxa
    
    //public functions
    return {
      buildTheTree: buildTheTree, 
      getLoadedCurrentTaxa: getLoadedCurrentTaxa, 
      getMasterTaxa: getMasterTaxa

      
    };//end of return

  }); //end of factory
