using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipesBookApi.Model;
using RecipesBookApi.ViewModel;

namespace RecipesBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeDBContext _context;

        public RecipesController(RecipeDBContext context)
        {
            _context = context;
        }

        // GET: api/Recipes
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<RecipeViewModel>>> GetRecipes()
        {
            return await _context.Recipes.Include("Ingredients").Select(x => new RecipeViewModel
            {
                Id = x.Id,
                Description = x.Description,
                ImagePath = x.ImagePath,
                Name = x.Name,
                Ingredients = x.Ingredients.Select(z => new IngredientViewModel
                {
                    Id = z.Id,
                    Amount = z.Amount,
                    Name = z.Name,
                    RecipeId = z.RecipeId
                }).ToList()
            }).ToListAsync();
            //return await _context.Recipes.Include("Ingredients").ToListAsync();
        }

        // GET: api/Recipes/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipe;
        }

        // PUT: api/Recipes
        [HttpPut, Authorize]
        public async Task<IActionResult> PutRecipes(IEnumerable<Recipe> recipes)
        {
            if (recipes == null || recipes.Count() == 0)
            {
                return BadRequest();
            }

            foreach (var recipe in recipes)
            {
                _context.Recipes.Add(recipe);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                foreach (var recipe in recipes)
                {
                    if (!RecipeExists(recipe.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return NoContent();
        }

        // PUT: api/Recipes/5
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipe).State = EntityState.Modified;
            foreach (var ingredient in recipe.Ingredients)
            {
                _context.Entry(ingredient).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Recipes
        [HttpPost, Authorize]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<Recipe>> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return recipe;
        }

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
