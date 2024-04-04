namespace recipe_site_server.models
{
    public class recipeModel
    {
        public string RecipeId { get; set; }    
        public string RecipeName { get; set; }
        public string CategoryId { get; set; }
        public int RecipeDurationM { get; set; }
        public string RecipeLevel { get; set; }
        public DateTime AddRecipeTime { get; set; }
        public string[] RecipeIngredients { get; set; }
        public string[] RecipePreparation { get; set; }
        public string UserId { get; set; }
        public string RecipeImage { get; set; }


    }
}
