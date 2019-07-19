using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipesBookApi.Migrations
{
    public partial class AdicionadaReceitaComIngrediente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 333);

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "Name" },
                values: new object[] { 1, 200, "farinha" });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Description", "ImagePath", "Name" },
                values: new object[] { 1, "TESTe", "", "Bolo" });

            migrationBuilder.InsertData(
                table: "RecipeIngredient",
                columns: new[] { "RecipeId", "IngredientId" },
                values: new object[] { 1, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RecipeIngredient",
                keyColumns: new[] { "RecipeId", "IngredientId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "Name" },
                values: new object[] { 333, 56, "farinha" });
        }
    }
}
