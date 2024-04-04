using Microsoft.AspNetCore.Mvc;
using recipe_site_server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipe_site_server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class categoryController : ControllerBase
    {
        private static List<categoryModel> categoryList = new List<categoryModel>()
        {
            new categoryModel {CategoryId="1", CategoryName="dessert", CategoryIcon='t'},
            new categoryModel {CategoryId="2", CategoryName="mainDish", CategoryIcon='t'},
            new categoryModel {CategoryId="3", CategoryName="sideDish", CategoryIcon='t'}
        };


    // GET: api/<categoryController>
    [HttpGet]
        public IEnumerable<categoryModel> Get()
        {
            return categoryList;
        }

        // GET api/<categoryController>/5
        [HttpGet("{id}")]
        public categoryModel Get(string id)
        {
            int index= categoryList.FindIndex(c => c.CategoryId == id);
            if (index == -1) return null;
            return categoryList[index];
        }

        // POST api/<categoryController>
        [HttpPost]
        public categoryModel Post([FromBody] categoryModel value)
        {
            categoryList.Add(value);
            return value;

        }

        // PUT api/<categoryController>/5
        [HttpPut("{id}")]
        public categoryModel Put(string id, [FromBody] categoryModel value)
        {
            int index = categoryList.FindIndex(c => c.CategoryId == id);
            if (index == -1) return null;
            categoryList[index] = value;
            return value;
            
        }

        // DELETE api/<categoryController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            int index = categoryList.FindIndex(c => c.CategoryId == id);
            if (index != -1)
                categoryList.RemoveAt(index);
        }
    }
}
