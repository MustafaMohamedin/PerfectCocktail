
class CocktailAPI {


    // Get recipe name
    // Get Drinks by name
      async getDrinkByName(name){
        //  Get Cocktails by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
         
        // Return a json Response
          const cocktails = await apiResponse.json();
          // Return the object
             return {
               cocktails
             }
      }
      //  Get recipe ingredient
      // Get Drinks By Ingredient
      async getDrinkByIngredient(ingredient){
        //  Get cocktails by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        // Wait for Response and then return a JSON
        const cocktails = await apiResponse.json();

        // Return the object
          return {
            cocktails
          }
      }
      

      // Get Single Recipe
         async getSingleRecipe(id){
           const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}
           `);

          //  wait for the Response and then return a JSON
          const recipe = await apiResponse.json();

          // Return the object
             return{ 
                  recipe
             }
         }

        //  Get all the Categories in Search by Category
        async getCategories(){
          const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
          // Wait for the response and return a JSON
          const categories = await apiResponse.json();
          // Return a json response
            return {
              categories
            }
        }

        // Get all Drinks in case search by Category
        async getDrinksByCategory(category){
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
          // wait for the response and return a JSON
          const cocktails = await apiResponse.json();
          // Return a json object
            return {
              cocktails
            }
        }

        // Get Drinks By Alcohol
        async getDrinkByAlcohol( term ){
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
          // wait for the response and return a JSON
          const cocktails = await apiResponse.json();
          // Return the json object
            return {
              cocktails
            }
        }


}