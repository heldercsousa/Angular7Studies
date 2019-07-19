using System.Collections.Generic;

namespace RecipesBookApi.Model
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public List<RecipeIngredient> RecipeIngredient { get; set; }
    }
}
