using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipesBookApi.Model
{
    public class RecipeDBContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        public RecipeDBContext(DbContextOptions<RecipeDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecipeIngredient>()
                .HasKey(x => new { x.RecipeId, x.IngredientId });

            modelBuilder.Entity<Recipe>()
                .HasMany(x => x.RecipeIngredient)
                .WithOne(x => x.Recipe)
                .HasForeignKey(x => x.RecipeId);

            modelBuilder.Entity<Ingredient>()
                .HasMany(x => x.RecipeIngredient)
                .WithOne(x => x.Ingredient)
                .HasForeignKey(x => x.IngredientId);


            modelBuilder.Entity<Recipe>()
                .HasData(
                new Recipe
                {
                    Id = 1,
                    Description = "TESTe",
                    Name = "Bolo",
                    ImagePath = ""
                });

            modelBuilder.Entity<Ingredient>()
                .HasData(
                new Ingredient
                {
                    Id = 1,
                    Amount = 200,
                    Name = "farinha"
                }
                );

            modelBuilder.Entity<RecipeIngredient>()
                .HasData(
                new RecipeIngredient
                {
                    RecipeId = 1,
                    IngredientId = 1
                }
    );

            base.OnModelCreating(modelBuilder);
        }

    }
}
