using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipesBookApi.ViewModel
{
    public class RecipeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        //public List<RecipeIngredient> RecipeIngredient { get; set; }
        public List<IngredientViewModel> Ingredients { get; set; }
    }
}
