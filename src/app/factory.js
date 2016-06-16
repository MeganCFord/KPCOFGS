angular.module("Ident")
  .factory("COLFactory", function($http) {

    function COLforTaxa (nameToSend) {
      console.log("COLforTaxa Data", nameToSend );
      return $http({
        method: "GET", 
        url: `http://www.catalogueoflife.org/col/webservice?name=${nameToSend}&format=json&response=full`
      }).then((res)=> {
        
        //species objects don't have a 'results' object. TODO: set a 'isSpecies' variable to true or false based on this ternary as well.
        return (res.data.results ? 
           res.data.results[0] : res.data);
      
      }, (e) => {
        console.err(e);
        //
      }).then((data) => {
        //see above re: only doing this for higher taxa. This function populates the 'questions' on the main page to aid with tree traversal.
        data.child_taxa.forEach((taxa) => {
          taxa.question = checkScientificName(taxa);
        });
        return data;
      });//end of .then. 
    }//end of COLforTaxa




      //TODO: move this data into firebase??????? 
      
    function checkScientificName(taxa) {
      let question = "";
      switch(taxa.name) {
        //CHORDATA SUBTAXA
      case "Actinopterygii":
        question = "My animal is a fish with fins that are webs of skin supported by bony spines.";
        break;
      case "Amphibia": 
        question = "My animal is probably an amphibian: it has slimy skin that it can breathe through, and goes through a metamorphosis from an egg laid in water to adult form.";
        break;
      case "Appendicularia":
        question = "**My animal is a tiny clear plankton that usually floats near the ocean's surface and filters seawater through a sac to eat.";
        break;
      case "Ascidiacea":
        question = "**My animal is attached to a rock in the ocean and filters seawater through a sac to eat.";
        break;
      case "Aves":
        question = "My animal has feathers and wings.";
        break;
      case "Cephalaspidomorphi":
        question = "My animal is fish with a sucker mouth and no jaw.";
        break;
      case "Elasmobranchii":
        question = "My animal is a fish with cartilage instead of bones and a bony jaw separate from its skull- probably a shark or ray.";
        break;
      case "Holocephali":
        question = "**My animal is a fish with cartilage instead of bones, a long, whiplike tail, and a small, fleshy mouth." ;
        break;
      case "Leptocardii":
        question = "**My animal is a 2-3 inch long worm-shaped fish with no fins, a poorly-shaped tail, and only a little cartilage stiffening its gills.";
        break;
      case "Mammalia": 
        question = "My animal has fur or hair and gives birth to its babies.";
        break;
      case "Myxini": 
        question = "My animal is a slimy eel-shaped fish with eye spots, a cartilaginous skull, one nostril but no spinal bones.";
        break;
      case "Reptilia":
        question = "My animal is a reptile, so it's dry and has scales- probably.";
        break;
      case "Sarcopterygii":
        question = "My animal is a bony fish with lobed fins attached to the body by a single bone.";
        break;
      case "Thaliacea":
        question = "**My animal is a small, free-floating sac-like creature that filters seawater for food and propulsion.";
        break;
      default: 
        question = `scientific name: ${name}. Description Forthcoming, see 'More info'.`;
      }
      return question;
    }









// TODO: Switch all this functionality to wikipedia. possibly use this stuff if wikipedia doesn't have the info? 

    function populateTaxaCard (nameToSend) {
        return $http({
          method: "GET", 
          url: `http://eol.org/api/search/1.0.json?q=${nameToSend}&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=&cache_ttl=`
        }).then((res) => {
          return (res.data.results[0].id? res.data.results[0].id : res.data);
        }, (e) => {
          console.log("error", e );
        })//end of resolve/reject
        .then((currentEolId)=> {
          return EOLforCommonInfo(currentEolId);
        })
        .then((data) => parseCommonInfo(data));//end of .then
    }//end of EOL for Id


    function EOLforCommonInfo(idToSend) {
      return $http({
        method: "GET", 
        url: `http://eol.org/api/pages/1.0.json?batch=false&id=${idToSend}&images_per_page=10&images_page=1&videos_per_page=0&videos_page=0&sounds_per_page=0&sounds_page=0&maps_per_page=0&maps_page=0&texts_per_page=2&texts_page=1&iucn=false&subjects=overview&licenses=all&details=true&common_names=true&synonyms=true&references=false&taxonomy=false&vetted=0&cache_ttl=&language=en`
      }).then((res) => {
        return res.data;
      }, (e) => {
        console.log("error", e );
      });//end of resolve/reject
    }//end of EOLforCommonInfo


    function parseCommonInfo(subtaxa) {
      return new Promise(function(resolve) {
      // console.log("parser is starting" );
        // console.log("object", subtaxa);
        subtaxa.textStuff = [];
        subtaxa.pictures = [];

        subtaxa.vernacularNames.forEach((name) => {
          if(name.language === "en" && name.eol_preferred=== true) {
            subtaxa.commonName = checkName(name.vernacularName);
          }//end of if-else
        });//end of vernacularname forEach 

        subtaxa.dataObjects.forEach((object) => {
          if (object.mimeType === "text/plain" || object.mimeType === "text/html") {
            subtaxa.textStuff.push( object.description);
          } 
          if (object.mimeType === "image/jpeg") {
            //I need to run a function somewhere that filters this array- runs a GET and if it returns success, add it to the 'pictures' array, and if not do nothing. 
            subtaxa.pictures.push( object.mediaURL);
          }//end of if-else

        });//end of dataObjects forEach
        
        resolve(subtaxa);
      });//end of promise
    }//end of parseCommonInfo

    function checkName(name) {
      let correctName = "";
      switch(name) {
      case "tuataras":
        correctName = "Tuatara";
        break;
      default:
        correctName = name;
      }
      return correctName;

    }

    return {
      COLforTaxa: COLforTaxa, 
      populateTaxaCard: populateTaxaCard, 
      EOLforCommonInfo: EOLforCommonInfo,  
      parseCommonInfo: parseCommonInfo
    };//end of return

  }); //end of factory
