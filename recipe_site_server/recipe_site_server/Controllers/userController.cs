using Microsoft.AspNetCore.Mvc;
using recipe_site_server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipe_site_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private static List<userModel> userList = new List<userModel>()
        {
            new userModel{UserId="1", UserName="moshe", UserEmail="moshe@gmail.com", UserAddress="moshe rabeino", UserPassword="1a2r4sd"},
                        new userModel{UserId="2", UserName="shira", UserEmail="shira@gmail.com", UserAddress="lochamim", UserPassword="852vbn"},
                                    new userModel{UserId="3", UserName="chaim", UserEmail="chaim@gmail.com", UserAddress="dvora hanvia", UserPassword="g8r54dfgv"},
                                                new userModel{UserId="4", UserName="mimi", UserEmail="mimi@gmail.com", UserAddress="hatav kok", UserPassword="rfge8745"}
        };
        public static int idCount = 5;


        // GET: api/<userController>
        [HttpGet]
        public IEnumerable<userModel> Get()
        {
            return userList;
        }

        // GET api/<userController>/5
        [HttpGet("{id}")]
        public userModel Get(string id)
        {
            int index = userList.FindIndex(c => c.UserId == id);
            if (index == -1)
                return null;
            return userList[index];
        }

        // GET api/<userController>/5
        [HttpPost("name")]
        public ActionResult GetByName([FromBody] userModel value)
        {
            int index = userList.FindIndex(c => c.UserName == value.UserName || c.UserPassword == value.UserPassword);

            if (index == -1)
                return NotFound("User not found");

            else if (userList[index].UserPassword == value.UserPassword && userList[index].UserName == value.UserName) 
                return Ok( new { StatusCode = 200, User = userList[index] });

            else return BadRequest("Incorrect password or user name");
        }

        // POST api/<userController>
        [HttpPost]
        public userModel Post([FromBody] userModel value)
        {
            bool flag = true; 
            value.UserId = idCount.ToString();

            foreach(var user in userList)
            {
                if (user.UserName == value.UserName && user.UserPassword == value.UserPassword)
                    flag = false;
            }
            if (flag)
            {
                userList.Add(value);
                idCount++;
                return value;
            }
            return null;
            
        }

        // PUT api/<userController>/5
        [HttpPut("{id}")]
        public userModel Put(string id, [FromBody] userModel value)
        {
            int index = userList.FindIndex(c => c.UserId == id);
            if (index == -1) 
                return null;
            userList[index] = value;    
            return value;       
        }

        // DELETE api/<userController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            int index = userList.FindIndex(c => c.UserId == id);
            if (index != -1)
                userList.RemoveAt(index);

        }
    }
}
