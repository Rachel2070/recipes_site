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
            new recipeModel{RecipeId="1",RecipeName="cheeseCake",RecipeDurationM=30,RecipeIngredients=new string[]{"f","l","j"}, RecipeLevel=4, RecipePreparation = new string[]{"jmkl", "vbhjkl"}, AddRecipeTime=new DateTime(),CategoryId="1", UserId="1", RecipeImage="https://cdn.getmood.io/warehouse/dynamic/235824.jpg"},
                        new recipeModel{RecipeId="2",RecipeName="meat",RecipeDurationM=180,RecipeIngredients=new string[]{"f","j"}, RecipeLevel=4, RecipePreparation = new string[]{"jmkl"}, AddRecipeTime=new DateTime(),CategoryId="2", UserId="1",RecipeImage="https://www.hashikma-holon.co.il/wp-content/uploads/2020/01/0c260b3bdf6c00cd475c41b69f606002-e1579793616823.jpg"},
                                    new recipeModel{RecipeId="3",RecipeName="pasta",RecipeDurationM=30,RecipeIngredients=new string[]{"f","l","j"}, RecipeLevel=3, RecipePreparation = new string[]{"jmkl", "vbhjkl"}, AddRecipeTime=new DateTime(),CategoryId="3", UserId="2",RecipeImage="https://files.mishloha.co.il/files/rest_header/RHMM_3190_1646809359713.jpg"},
                                                new recipeModel{RecipeId="4",RecipeName="cheeseCake",RecipeDurationM=30,RecipeIngredients=new string[]{"f","l","j"}, RecipeLevel=5, RecipePreparation = new string[]{"jmkl", "vbhjkl"}, AddRecipeTime=new DateTime(),CategoryId="1", UserId="3",RecipeImage="https://medias.timeout.co.il/www/uploads/2022/04/1649058943_1261542_72289-e1649072974609-600x600.jpg"},

        };
        public static int idCount=5;
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
            value.RecipeId = idCount.ToString();
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
