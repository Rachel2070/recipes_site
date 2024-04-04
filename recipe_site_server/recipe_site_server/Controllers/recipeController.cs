using Microsoft.AspNetCore.Mvc;
using recipe_site_server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipe_site_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class recipeController : ControllerBase
    {
        private static List<recipeModel> recipesList = new List<recipeModel>()
        {
            new recipeModel{RecipeId="1",RecipeName="cheeseCake",RecipeDurationM=30,RecipeIngredients=new string[]{"f","l","j"}, RecipeLevel="medium", RecipePreparation = new string[]{"jmkl", "vbhjkl"}, AddRecipeTime=new DateTime(),CategoryId="1", UserId="1"},
                        new recipeModel{RecipeId="2",RecipeName="meat",RecipeDurationM=180,RecipeIngredients=new string[]{"f","j"}, RecipeLevel="medium", RecipePreparation = new string[]{"jmkl"}, AddRecipeTime=new DateTime(),CategoryId="2", UserId="1"},
                                    new recipeModel{RecipeId="3",RecipeName="pasta",RecipeDurationM=30,RecipeIngredients=new string[]{"f","l","j"}, RecipeLevel="medium", RecipePreparation = new string[]{"jmkl", "vbhjkl"}, AddRecipeTime=new DateTime(),CategoryId="3", UserId="2"},
                                                new recipeModel{RecipeId="4",RecipeName="cheeseCake",RecipeDurationM=30,RecipeIngredients=new string[]{"f","l","j"}, RecipeLevel="medium", RecipePreparation = new string[]{"jmkl", "vbhjkl"}, AddRecipeTime=new DateTime(),CategoryId="1", UserId="3"},

        };
        // GET: api/<recipeController>
        [HttpGet]
        public IEnumerable<recipeModel> Get()
        {
            return recipesList;
        }

        // GET api/<recipeController>/5
        [HttpGet("{id}")]
        public recipeModel Get(string id)
        {
            int index = recipesList.FindIndex(c => c.RecipeId == id);
            if (index == -1) return null;
            return recipesList[index];
        }

        // POST api/<recipeController>
        [HttpPost]
        public recipeModel Post([FromBody] recipeModel value)
        {
            recipesList.Add(value);
            return value;
        }

        // PUT api/<recipeController>/5
        [HttpPut("{id}")]
        public recipeModel Put(string id, [FromBody] recipeModel value)
        {
            int index = recipesList.FindIndex(c => c.RecipeId == id);
            if (index == -1) return null;
            recipesList[index] = value;     
            return value;   
        }

        // DELETE api/<recipeController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            int index = recipesList.FindIndex(c => c.RecipeId == id);
            if (index != -1) 
                recipesList.RemoveAt(index);        
        }
    }
}
