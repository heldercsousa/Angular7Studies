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
        //public DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        public RecipeDBContext(DbContextOptions<RecipeDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*
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
            ); */

            modelBuilder.Entity<Recipe>()
                .HasData(new Recipe
                {
                    Id = 1,
                    Name = "First Recipe",
                    Description = "This is simples man",
                    ImagePath = "https://media.timeout.com/images/102063911/image.jpg"
                },
                new Recipe
                {
                    Id = 2,
                    Name = "Second Recipe",
                    Description = "This is a second one",
                    ImagePath = "https://media.timeout.com/images/102063911/image.jpg"
                },
                new Recipe
                {
                    Id = 3,
                    Name = "Third Recipe",
                    Description = "This is a third one",
                    ImagePath = "https://media.timeout.com/images/102063911/image.jpg"
                },
                new Recipe
                {
                    Id = 4,
                    Name = "Fourth Recipe",
                    Description = "This is a fourth one",
                    ImagePath = "https://media.timeout.com/images/102063911/image.jpg"
                });

            modelBuilder.Entity<Ingredient>()
                .HasData(
                new Ingredient
                {
                    Id = 1,
                    Amount = 2,
                    Name = "Apple",
                    RecipeId = 1
                },
                new Ingredient
                {
                    Id = 2,
                    Amount = 1,
                    Name = "Rice",
                    RecipeId = 1
                },
                new Ingredient
                {
                    Id = 3,
                    Amount = 1,
                    Name = "Water Mellon",
                    RecipeId = 2
                },
                new Ingredient
                {
                    Id = 4,
                    Amount = 4,
                    Name = "Orange Juice",
                    RecipeId = 2
                },
                new Ingredient
                {
                    Id = 5,
                    Amount = 4,
                    Name = "Beans",
                    RecipeId = 3
                },
                new Ingredient
                {
                    Id = 6,
                    Amount = 2,
                    Name = "Tommatoes",
                    RecipeId = 3
                },
                new Ingredient
                {
                    Id = 7,
                    Amount = 1,
                    Name = "Flowers",
                    RecipeId = 4
                },
                new Ingredient
                {
                    Id = 8,
                    Amount = 2,
                    Name = "Bread",
                    RecipeId = 4
                },
                new Ingredient
                {
                    Id = 9,
                    Amount = 4,
                    Name = "Butter",
                    RecipeId = 4
                });

            base.OnModelCreating(modelBuilder);
        }

    }
}
