angular.module("Ident")
  .factory("COLFactory", function($http) {

    function COLforTaxa (nameToSend) {
      console.log("COLforTaxa Data", nameToSend );
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        //species objects don't have a 'results' object. 
        //TODO: set a 'isSpecies' variable to true or false based on this ternary as well.
        return (res.data.results ? 
           res.data.results[0] : res.data);
      
      }, (e) => {
        console.err(e);
        //
      }).then((data) => {
        //see above re: only doing this for higher taxa. This function populates the 'questions' on the main page to aid with tree traversal.
        data.child_taxa.forEach((taxa) => {
          taxa = checkScientificName(taxa);
        });
        return data;
      });//end of .then. 
    }//end of COLforTaxa



      //TODO: move this data into firebase, use a Promise.all. 
      
    function checkScientificName(taxa) {
      const currentTaxa = taxa;
      switch(taxa.name) {
        //CHORDATA SUBTAXA
      case "Actinopterygii":
        currentTaxa.question = "My animal is a fish with fins that are webs of skin supported by bony spines.";
        currentTaxa.disableMe=true;
        break;
      case "Amphibia": 
        currentTaxa.question = "My animal is probably an amphibian: it has slimy skin with no scales or fur/hair, and goes through a metamorphosis from an egg laid in water to adult form.";
        currentTaxa.disableMe=true;
        break;
      case "Appendicularia":
        currentTaxa.question = "My animal is a tiny clear plankton that usually floats near the ocean's surface and filters seawater through a sac to eat.";
        currentTaxa.disableMe=true;
        break;
      case "Ascidiacea":
        currentTaxa.question = "My animal is attached to a rock in the ocean and filters seawater through a sac to eat.";
        currentTaxa.disableMe=true;
        break;
      case "Aves":
        currentTaxa.question = "My animal has feathers and wings.";
        currentTaxa.disableMe=true;
        break;
      case "Cephalaspidomorphi":
        currentTaxa.question = "My animal is fish with a sucker mouth and no jaw.";
        currentTaxa.disableMe=true;
        break;
      case "Elasmobranchii":
        currentTaxa.question = "My animal is a fish with cartilage instead of bones and a bony jaw separate from its skull- probably a shark or ray.";
        currentTaxa.disableMe=true;
        break;
      case "Holocephali":
        currentTaxa.question = "My animal is a fish with cartilage instead of bones, a long, whiplike tail, and a small, fleshy mouth." ;
        currentTaxa.disableMe=true;
        break;
      case "Leptocardii":
        currentTaxa.question = "My animal is a 2-3 inch long worm-shaped fish with no fins, a poorly-shaped tail, and only a little cartilage stiffening its gills.";
        currentTaxa.disableMe=true;
        break;
      case "Mammalia": 
        currentTaxa.question = "My animal has fur or hair and gives birth to its babies.";
        break;
      case "Myxini": 
        currentTaxa.question = "My animal is a slimy eel-shaped fish with eye spots, a cartilaginous skull, one nostril but no spinal bones.";
        currentTaxa.disableMe=true;
        break;
      case "Reptilia":
        currentTaxa.question = "My animal is a reptile, so it's probably dry and has scales.";
        break;
      case "Sarcopterygii":
        currentTaxa.question = "My animal is a bony fish with lobed fins attached to the body by a single bone.";
        break;
      case "Thaliacea":
        currentTaxa.question = "My animal is a small, free-floating sac-like creature that filters seawater for food and propulsion.";
        currentTaxa.disableMe=true;
        break;
      default: 
        currentTaxa.question = `scientific name: ${currentTaxa.name}. Description Forthcoming, see 'More info'.`;
      }
      return taxa;
    }
    
    //public functions
    return {
      COLforTaxa: COLforTaxa 
      
    };//end of return

  }); //end of factory
