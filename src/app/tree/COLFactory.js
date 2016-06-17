angular.module("Ident")
  .factory("COLFactory", function($http) {

    let currentTaxaData = null;

    function getCurrentTaxa () {
      return currentTaxaData;
    }

    function COLforTaxa (nameToSend) {
      console.log("COLforTaxa Data", nameToSend );
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        //species objects don't have a 'results' object. 
        //TODO: set a 'isSpecies' variable to true or false based on this ternary as well.
        currentTaxaData = res.data.results ? 
           res.data.results[0] : res.data;
        currentTaxaData = addMyOwnData(currentTaxaData);
        return currentTaxaData;
      
      }, (e) => {
        console.err(e);
        //
      }).then((data) => {
        //see above re: only doing this for higher taxa. This function populates the 'questions' on the main page to aid with tree traversal.
        data.child_taxa.forEach((taxa) => {
          taxa = addMyOwnData(taxa);
        });
        currentTaxaData = data;
        console.log("current taxa data", currentTaxaData );
        return data;
      });//end of .then. 
    }//end of COLforTaxa



      //TODO: move this data into firebase, use a Promise.all. 
      
    function addMyOwnData(taxa) {
      const currentTaxa = taxa;
      switch(taxa.name) {
      case "Chordata":
        currentTaxa.question = "is a creature with a spinal cord (and probably a spine).";
        break;
        //CHORDATA SUBTAXA
      case "Actinopterygii":
        currentTaxa.question = "is a fish with fins that are webs of skin supported by bony spines.";
        currentTaxa.enableMe=false;
        break;
      case "Amphibia": 
        currentTaxa.question = "is probably an amphibian: it has slimy skin with no scales or fur/hair, and goes through a metamorphosis from an egg laid in water to adult form.";
        currentTaxa.enableMe=false;
        break;
      case "Appendicularia":
        currentTaxa.question = "is a tiny clear plankton that usually floats near the ocean's surface and filters seawater through a sac to eat.";
        currentTaxa.enableMe=false;
        break;
      case "Ascidiacea":
        currentTaxa.question = "is attached to a rock in the ocean and filters seawater through a sac to eat.";
        currentTaxa.enableMe=false;
        break;
      case "Aves":
        currentTaxa.question = "has feathers and wings.";
        currentTaxa.enableMe=false;
        break;
      case "Cephalaspidomorphi":
        currentTaxa.question = "is fish with a sucker mouth and no jaw.";
        currentTaxa.enableMe=false;
        break;
      case "Elasmobranchii":
        currentTaxa.question = "is a fish with cartilage instead of bones and a bony jaw separate from its skull- probably a shark or ray.";
        currentTaxa.enableMe=false;
        break;
      case "Holocephali":
        currentTaxa.question = "is a fish with cartilage instead of bones, a long, whiplike tail, and a small, fleshy mouth." ;
        currentTaxa.enableMe=false;
        break;
      case "Leptocardii":
        currentTaxa.question = "is a 2-3 inch long worm-shaped fish with no fins, a poorly-shaped tail, and only a little cartilage stiffening its gills.";
        currentTaxa.enableMe=false;
        break;
      case "Mammalia": 
        currentTaxa.question = "has fur or hair and gives birth to its babies.";
        currentTaxa.enableMe=true;
        break;
      case "Myxini": 
        currentTaxa.question = "is a slimy eel-shaped fish with eye spots, a cartilaginous skull, one nostril but no spinal bones.";
        currentTaxa.enableMe=false;
        break;
      case "Reptilia":
        currentTaxa.question = "is a reptile, so it's probably dry and has scales.";
        currentTaxa.enableMe=true;
        break;
      case "Sarcopterygii":
        currentTaxa.question = "is a bony fish with lobed fins attached to the body by a single bone.";
          currentTaxa.enableMe=true;
        break;
      case "Thaliacea":
        currentTaxa.question = "is a small, free-floating sac-like creature that filters seawater for food and propulsion.";
        currentTaxa.enableMe=false;
        break;
      default: 
        currentTaxa.question = `scientific name: ${currentTaxa.name}. Description Forthcoming, see 'More info'.`;
        currentTaxa.enableMe=true;
      }
      return taxa;
    }
    
    //public functions
    return {
      COLforTaxa: COLforTaxa, 
      getCurrentTaxa: getCurrentTaxa
      
    };//end of return

  }); //end of factory
