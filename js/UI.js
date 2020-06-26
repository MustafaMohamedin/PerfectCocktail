        //   EVERYTHING RELATED TO THE USER INTERFACE.
class UI {


      // display all the Categories in the Select
      displayCategories(){
        const categoriesList = cocktail.getCategories()
          .then(categories => {
            const catList = categories.categories.drinks;
            
            // append the first option without value
            const firstOption = document.createElement('option');
            firstOption.textContent = '-- Select --';
            firstOption.value = '';
            document.querySelector('#search').appendChild(firstOption);

            // append the other options
            catList.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category.strCategory;
                option.value = category.strCategory.split(' ').join('_');
                document.querySelector('#search').appendChild(option);
                
            });

          })
      }

      //  Display cocktails without Ingredients
      displayDrinks(drinks){
        // Show the Results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // insert the Results
        const resultsDiv = document.querySelector('#results');

        // loop throught Drinks
        drinks.forEach( drink => {
            // Build the Template
            resultsDiv.innerHTML += `
                <div class="col-md-5">
                  <div class="card-my-3">
                  <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info ">
                   +
                  </button>
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" >
                  </div>
                  <div class="card-body">
                     <h2 class="card-title text-center">${drink.strDrink} </h2>
                     <a  data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">
                          Get Recipe </a>
                  </div>
                
                </div>
            
            `;
        });
          this.isFavorite();

      }

       // Displays Cocktails wirh Ingredients
      displayDrinkWithIngredients(drinks){
            // Show the Results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

          // Insert the Results
          const resultsDiv = document.querySelector('#results');
            //  loop through the Drinks
            drinks.forEach( drink => {
                //  Build The Template
                resultsDiv.innerHTML += `
                  <div class="col-md-6">
                     <div class="card my-3">
                     <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info ">
                     +
                    </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" >
                        
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink} </h2>
                            <p class="card-text font-weight-bold"> Instrucions :
                               
                            </p>
                            <p class="card-text">
                                    ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                   <li class="list-group-item alert alert-danger">Ingerdients</li>

                                      ${this.displayIngredients(drink)}


                                </ul>

                            </p>
                            <p class="card-text font-weight-bold"> Extra Information : </p>
                            <p class="card-text">
                               <span class="badge badge-pill badge-success">
                                      ${drink.strAlcoholic}
                               </span>
                               <span class="badge badge-pill badge-warning">
                                      Category : ${drink.strCategory}
                               </span>
                            </p>

                        </div>
                     </div>
                  </div>
                
                `;
            });
            this.isFavorite();
      }

      
        // Display Single Recipe
        displaySingleRecipe(recipe){

          // Get Variables
          const modalTitle = document.querySelector('.modal-title');
          const modalDiscription = document.querySelector('.modal-body .description-text');
          const modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

                // Set the Values
              modalTitle.innerHTML = recipe.strDrink;
              modalDiscription.innerHTML = recipe.strInstructions;

              // Display the Ingredients
              let ingredientsList = this.displayIngredients(recipe);
              modalIngredients.innerHTML = ingredientsList;

          
        }

    //   Prints The Ingredients and Measurements
      displayIngredients(drink){
        
        let ingredients = [];
        for( let i= 1; i < 16; i++){
            const ingredientMeasure = {};
            if( drink[`strIngredient${i}`] !== "" ){
                ingredientMeasure.ingerdien = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }
          
        // Build The Template
         let ingredientsTemplate = '';
         ingredients.forEach( ingredient => {
                ingredientsTemplate += `
                <li class="list-group-item">${ingredient.ingerdien} - ${ingredient.measure}</li>

                `;
         });
              return ingredientsTemplate;

      }


    //  Displays a Custom Message
      printMessage( message , className){
          // Create a div
          const div = document.createElement('div');

          // Add to the HTML
          div.innerHTML = `
              <div class="alert alert-dismissible alert-${className} ">
              <button type="button" class="close" data-dismiss="alert">X</button>
                    ${message}
              </div>
            
          
          `;
              // inersr Before
          const reference = document.querySelector('.jumbotron h1');
          const parentNode = reference.parentElement;
          parentNode.insertBefore( div, reference);

          // Remove the message after 3 seconds
          setTimeout(() => {
              document.querySelector('.alert').remove();
          }, 3000);


      }

      //  Clear the Previous Results
        clearPrevResults(){
          const resultsDiv = document.querySelector('#results');
          resultsDiv.innerHTML = '';
        }


        // display favorites from Storage
        displayFavorites(favorites){
          const favoritesTable = document.querySelector('#favorites tbody');

          // loop throught the favorites and display them
          favorites.forEach( drink => {
              // Create a table row 
              const tr = document.createElement('tr');
              // insert the information
              tr.innerHTML = `
              
                <td>
                     <img src="${drink.image}" alt="${drink.name}" width=50>
                </td>
                <td> ${drink.name} </td>

                <td>
                      <a href="#" data-id="${drink.id}" data-toggle="modal" data-target="#recipe" class="get-recipe btn btn-success"> View </a>
                </td>

                <td>
                      <a href="#" data-id="${drink.id}" class="remove-recipe btn btn-warning"> Remove </a>
                </td>
              
              
              `;
              favoritesTable.appendChild(tr);
          });

        }

        // Remove the single favorite from the dom
        removeFavorite(singleElement){
          singleElement.remove();
        }


        // Add a class when cocktail is favorite 
        isFavorite(){

          //  Return the whole object from the Storage
          const drinks = cocktailDB.getFromDB();

          // loop throught the object
          drinks.forEach( drink => {
                
            // Destructuring the id 
              let {id} = drink;

              // Select the favorite
              let favoriteDrink = document.querySelector(` [data-id= "${id}"] `);

               if(favoriteDrink){
                 favoriteDrink.classList.add('is-favorite');
                 favoriteDrink.textContent = '-';
               }
          });
        }
      
}