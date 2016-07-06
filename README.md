# NSS-FrontEnd-Capstone

**Author**: Megan Ford 2016

Front End Capstone (Animal Identification) project for Nashville Software School

Individual student project, completed between June 13 and July 6, 2016 to represent cumulative information learned during front end portion of NSS's program.


This is an animal identification app meant to allow a user to traverse the Tree of Life by answering questions, and to discover information about animals at every taxonomic level. 


User features include:

1. Firebase image upload
2. Forward, backward, skip-backward, and browser-button functionality to traverse through Kingdom, Phylum, Class, Order, Family, Genus, and Species. 
3. Construction of a cumulative 'My Animal' user object on DOM and in Firebase that persists through traversal
4. Custom taxa questions to make traversing the animal tree a fun, '20-questions' activity
5. Informative modals through all taxa levels that pull from up to 120 databases to provide varied images and text
6. 'My Animal' feed on start page

Code features include: 
1. Use of Angular, SCSS, and UI-Bootstrap
2. Data loaded through Angular Routing 
3. Nested scopes that communicate with one another through several $event emitters 
4. Makes up to 220 calls to multiple API's on each page load during resolve
5. Fully custom question database to connect with EOL API data, and also option to explore additional taxa

# Installation 

```
git clone [link]
cd nss-frontend-capstone
npm install 
bower install 
npm run serve
```

# *IMPORTANT*

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

# License 

The MIT License (MIT)

Copyright (c) 2016 Megan C Ford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



