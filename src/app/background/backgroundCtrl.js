angular.module("Ident")
  .controller("Background", function($scope, $route) {
    const background = this;

    //determines which controllers load into the recessed divs.
    background.location=$route.current.$$route.originalPath;

    if (background.location === "/tree/:taxa") {
      background.tree = true;
    } else if (background.location === "/species/:taxa") {
      background.end = true;
    }else if (background.location === "/start") {
      background.start=true;
    }


    //determines current rank from child scopes, for navbar styling.
    background.currentRank = null;
    $scope.$on("settingCurrentRank", function (event, value) {
      background.currentRank = value;
    });

    //V2: making my controller aware of CSS isn't ideal- will refactor when I come up with a better idea like maybe assigning a number value to the ranking.
    background.setRankingClasses = (navWord) => {
      if(navWord === background.currentRank) {
        return "active-rank";
      } 
      if (navWord === "Kingdom") {
        if (background.currentRank === "Phylum" || background.currentRank === "Class" || background.currentRank === "Order" || background.currentRank === "Family" || background.currentRank === "Genus" || background.currentRank === "Species") {
          return "completed-rank";
        }
      } else if (navWord === "Phylum") {
        if (background.currentRank === "Class" || background.currentRank === "Order" || background.currentRank === "Family" || background.currentRank === "Genus" || background.currentRank === "Species") {
          return "completed-rank";
        }
      } else if (navWord === "Class") {
        if (background.currentRank === "Order" || background.currentRank === "Family" || background.currentRank === "Genus" || background.currentRank === "Species") {
          return "completed-rank";
        }
      } else if (navWord === "Order") {
        if (background.currentRank === "Family" || background.currentRank === "Genus" || background.currentRank === "Species") {
          return "completed-rank";
        }
      } else if (navWord === "Family") {
        if (background.currentRank === "Genus" || background.currentRank === "Species") {
          return "completed-rank";
        }
      }
    };

  });
