﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipesBookApi.ViewModel
{
    public class IngredientViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public int RecipeId { get; set; }
    }
}
