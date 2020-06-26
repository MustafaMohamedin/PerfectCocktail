// Everything Related into the DB
class CocktailDB {

  // save the recipe into the local Storage
   saveIntoDB(drink){
     const drinks = this.getFromDB();
     
     drinks.push(drink);

    //  Add the new Array into the local Storage
     localStorage.setItem('drinks' , JSON.stringify(drinks));

   }

     


  // Return recipe from Storage
    getFromDB(){
       let drinks;

      //  Check from local Storage
         if( localStorage.getItem('drinks') === null){
             drinks = [];
         } else {
             drinks = JSON.parse( localStorage.getItem('drinks') );
         }
            return drinks;
    }

    // Remove the single favorite from the local storage
      removeFromDB(id){
          const drinks = this.getFromDB();

          // loop into local storage 
          drinks.forEach( (drink , index) => {

              if( id === drink.id ){
                  drinks.splice( index , 1);
              }

          });

          // Set the Array into local Storage
          localStorage.setItem('drinks' , JSON.stringify(drinks) );
          
      }

}