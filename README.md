# NSS-FrontEnd-Capstone

**Author**: Megan Ford 2016

Front End Capstone (Animal Identification) project for Nashville Software School
Deployed at [http://meganfordcodes.com/animals/](http://meganfordcodes.com/animals)
*note, app looks best when zoomed out (to about 60%).*

Animal identification app allows a user to traverse the Tree of Life by answering questions and to discover information about animals at every taxonomic level. 

Individual student project, written in Angular and completed between June 13 and July 6, 2016, to represent cumulative information learned during front end portion of NSS's program and to practice parsing and displaying data from multiple API's in a meaningful way.

Converted to full stack Angular/Django web application September 2016 (5 day timeline) in order to deploy on [meganfordcodes.com](http://meganfordcodes.com/animals/) and represent information learned during back end portion of NSS's program. Catalog of Life API deprecated, so relevant data auto-migrates to Firebase database for future reference (code will be refactored once migration is complete).


##### Code features include: 

1. Use of Python, Django, Angular, SCSS, and UI-Bootstrap
2. Data loaded through Angular Routing and nested scopes
3. 'current rank' styling emitted to parent scope through $event emitters 
4. Makes up to 220 calls to multiple API's on each page load using Django requests package and Angular promises
5. Fully custom question database to connect with EOL API data, and also option to explore additional taxa
6. Auto-migration from deprecated catalog-of-life database to Firebase using Python

##### User features include:

1. Firebase image upload
2. Forward, backward, skip-backward, and browser-button functionality to traverse through Kingdom, Phylum, Class, Order, Family, Genus, and Species. 
3. Construction of a cumulative 'My Animal' user object on DOM that persists through traversal
4. Custom taxa questions to make traversing the animal tree a fun, '20-questions' activity
5. Informative modals through all taxa levels that pull from up to 120 databases to provide varied images and text
6. 'My Animal' feed on start page

----------

### Installation 

```
$ git clone https://github.com/MeganCFord/KPCOFGS.git
$ cd animal-ident-capstone
$ npm install 
$ bower install 
```
serve on server of choice (default app dependency is http-server).

### *IMPORTANT*

In order to make UIB carousel work inside UIB modal, I had to comment out two lines of UIB code per [this unresolved issue:](https://github.com/angular-ui/bootstrap/issues/5379). 
For reference, this is the full function, currently found on lines 489 ff of ui-bootstrap-tpls.js: 

```
//Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide.slide.index !== currentIndex 
    //&& !$scope.$currentTransition <<<<<<<<<< COMMENTED THIS OUT
      ) {
      goNext(nextSlide.slide, nextIndex, direction);
    } else if (nextSlide && nextSlide.slide.index !== currentIndex 
    //&& $scope.$currentTransition <<<<<<<<<<< COMMENTED THIS OUT
      ) {
      bufferedTransitions.push(slides[nextIndex]);
    }
  };
```

Without these lines commented out, the UIB carousels in the 'more info' modals will not progress past picture 2. 

-------------

##### License: [MIT](license.txt) 


