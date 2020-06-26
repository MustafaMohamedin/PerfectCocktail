
// Instanciate the Classes

const ui = new UI();
const cocktail = new CocktailAPI();
const cocktailDB = new CocktailDB();



// Event Listeners
    function eventListeners(){

      // document Ready 
      document.addEventListener('DOMContentLoaded' , documentReady);

      // add event listeners when the form is submitted.
      const searchForm = document.querySelector('#search-form');
      if(searchForm){
        searchForm.addEventListener('submit' , getCocktails);
      }

        // The Result div Listener
      const resultsDiv = document.querySelector('#results');
      if(resultsDiv){
        resultsDiv.addEventListener('click' , resultsDelegation);
      }

    }

 

     // Excute the Event Listener
     eventListeners();

    // Get Colcktails function
    function getCocktails(e){
        e.preventDefault();
        const searchTerm = document.querySelector('#search').value;
        //  Check if the user type something in the input field
          if(searchTerm === ''){
            // Print the error message 
                // Call the user interface printMessage.
                ui.printMessage('Please add somthing to Search' , 'danger');
          } else{

                //  Server Response from the Promise
                let serverResponse;

                // type of the Search ( ingredients , cocktails , or name);
                const type = document.querySelector('#type').value;

                // Evaluate the type of the method and then excute the Query

                 switch(type){
                     case 'name':
                        serverResponse = cocktail.getDrinkByName( searchTerm );
                          break;
                     case 'ingredient':
                        serverResponse = cocktail.getDrinkByIngredient( searchTerm );
                          break;
                    case 'category':
                        serverResponse = cocktail.getDrinksByCategory( searchTerm );
                          break;
                    case 'alcohol':
                        serverResponse = cocktail.getDrinkByAlcohol( searchTerm );
                          break;
                 }

                //  Clearing the previous Results
                  ui.clearPrevResults();
                 

                //  Query By the name of the drink
                //  Access the promise
                   serverResponse.then( cocktails => {
                  
                     // Check if the Cocktails exists
                    if(cocktails.cocktails.drinks === null){
                      // Nothing exist , print a message
                      ui.printMessage('There\'re no Results , please try by differend term. ' , 'danger');

                    } else {

                       if( type === 'name') {
                         // Display with ingredients
                         ui.displayDrinkWithIngredients(cocktails.cocktails.drinks);
                       }else {
                        //  Display without ingredients ( Category , alcohol , ingredient)
                         ui.displayDrinks(cocktails.cocktails.drinks);
                       }
                       
                    }
                });
          }

        }
          // Delegation for the #results area
          function resultsDelegation(e){
            e.preventDefault();

            if(e.target.classList.contains('get-recipe')){
               cocktail.getSingleRecipe(e.target.dataset.id)
                .then( recipe => {
                  
                  // Display Single Recipe into a modal
                  ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                })

            }

            // When the favorite button is clicked
            if(e.target.classList.contains('favorite-btn') ){
                 if(e.target.classList.contains('is-favorite') ){
                    // Remove the class 
                    e.target.classList.remove('is-favorite');
                    e.target.textContent = '+';
                    cocktailDB.removeFromDB( e.target.dataset.id );

                 } else {
                    // Add the class
                    e.target.classList.add('is-favorite');    
                    e.target.textContent = '-';

                    // Get Info
                    const cardBody = e.target.parentElement;
                    // create an object to whole all the information
                    const dirnkInfo = {
                      id: e.target.dataset.id,
                      name: cardBody.querySelector('.card-title').textContent,
                      image: cardBody.querySelector('.card-img-top').src
                    }
                    // console.log(dirnkInfo)
                    // Save into the local Storage
                    cocktailDB.saveIntoDB(dirnkInfo);

                 }
            }
            

          }

          // document Ready 
          function documentReady(){
            // display the favorites drinks when the page is load.
             ui.isFavorite();

            const searchCategory = document.querySelector('.search-category');
            if(searchCategory){
              // display all the Categories in the Select
              ui.displayCategories();
            }

              // When favorties load
              const favoritesTable = document.querySelector('#favorites');
               if(favoritesTable){
                 
                // Get the favorities from the Storage and display them
                const drinks = cocktailDB.getFromDB();
                // display the favorities
                ui.displayFavorites(drinks);


                // When the View or Remove button is clicked
                favoritesTable.addEventListener('click' , (e) => {
                    e.preventDefault();

                    // Delegation

                    // When the View button is clicked
                    if(e.target.classList.contains('get-recipe')){
                      cocktail.getSingleRecipe(e.target.dataset.id)
                       .then( recipe => {
                         
                         // Display Single Recipe into a modal
                         ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                       })
       
                   }

                  //  When the Remove button is clicked
                  if(e.target.classList.contains('remove-recipe') ){
                    
                    // Remove the single favorite from the DOM
                    ui.removeFavorite( e.target.parentElement.parentElement);

                    // Remove the single favorite from the local Storage
                    cocktailDB.removeFromDB( e.target.dataset.id );
                  }

                });


               }

          }

    
