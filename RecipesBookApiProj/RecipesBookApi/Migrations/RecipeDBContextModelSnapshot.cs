﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RecipesBookApi.Model;

namespace RecipesBookApi.Migrations
{
    [DbContext(typeof(RecipeDBContext))]
    partial class RecipeDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RecipesBookApi.Model.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount");

                    b.Property<string>("Name");

                    b.Property<int>("RecipeId");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.ToTable("Ingredients");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 2,
                            Name = "Apple",
                            RecipeId = 1
                        },
                        new
                        {
                            Id = 2,
                            Amount = 1,
                            Name = "Rice",
                            RecipeId = 1
                        },
                        new
                        {
                            Id = 3,
                            Amount = 1,
                            Name = "Water Mellon",
                            RecipeId = 2
                        },
                        new
                        {
                            Id = 4,
                            Amount = 4,
                            Name = "Orange Juice",
                            RecipeId = 2
                        },
                        new
                        {
                            Id = 5,
                            Amount = 4,
                            Name = "Beans",
                            RecipeId = 3
                        },
                        new
                        {
                            Id = 6,
                            Amount = 2,
                            Name = "Tommatoes",
                            RecipeId = 3
                        },
                        new
                        {
                            Id = 7,
                            Amount = 1,
                            Name = "Flowers",
                            RecipeId = 4
                        },
                        new
                        {
                            Id = 8,
                            Amount = 2,
                            Name = "Bread",
                            RecipeId = 4
                        },
                        new
                        {
                            Id = 9,
                            Amount = 4,
                            Name = "Butter",
                            RecipeId = 4
                        });
                });

            modelBuilder.Entity("RecipesBookApi.Model.Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("ImagePath");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Recipes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "This is simples man",
                            ImagePath = "https://media.timeout.com/images/102063911/image.jpg",
                            Name = "First Recipe"
                        },
                        new
                        {
                            Id = 2,
                            Description = "This is a second one",
                            ImagePath = "https://media.timeout.com/images/102063911/image.jpg",
                            Name = "Second Recipe"
                        },
                        new
                        {
                            Id = 3,
                            Description = "This is a third one",
                            ImagePath = "https://media.timeout.com/images/102063911/image.jpg",
                            Name = "Third Recipe"
                        },
                        new
                        {
                            Id = 4,
                            Description = "This is a fourth one",
                            ImagePath = "https://media.timeout.com/images/102063911/image.jpg",
                            Name = "Fourth Recipe"
                        });
                });

            modelBuilder.Entity("RecipesBookApi.Model.Ingredient", b =>
                {
                    b.HasOne("RecipesBookApi.Model.Recipe", "Recipe")
                        .WithMany("Ingredients")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
