angular.module("Ident")
.factory("ModalFactory", function($http) {

  return {
    populateModal: (nameToSend) => {
      // Get the EOL ID associated with the taxa scientific name.
      return $http.get(`http://127.0.0.1:8000/animals/id/${nameToSend}`)
      .then((res) => {
        if(res.data.length > 0) {
          // Get the EOL info associated with the taxa id.
          return $http.get(`http://127.0.0.1:8000/animals/info/${res.data}`);
        } else {
          // If there is no ID match, modal will populate using stock info.
          return {data: {scientificName: nameToSend, textStuff: ["this animal doesn't have any Encyclopedia of Life data stored. Try Wikipedia!"]}};
        }
      }, (e) => console.log(e))
      .then((res) => {
        return res.data;            
      }, (e) => console.log(e));
    }  
  };
});
