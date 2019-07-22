using System.Collections.Generic;

namespace RecipesBookApi.Model
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        //public List<RecipeIngredient> RecipeIngredient { get; set; }
        public List<Ingredient> Ingredients { get; set; }
    }
}
