using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));

            var dblist = dbclient.GetDatabase("testdb").GetCollection<Employee>("Employee").AsQueryable();

            return new JsonResult(dblist);
        }

        [HttpPost]

        public JsonResult Post(Employee emp)
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));

            int LastEmployeeId = dbclient.GetDatabase("testdb").GetCollection<Department>("Employee").AsQueryable().Count();
            emp.EmployeeId = LastEmployeeId + 1;
            dbclient.GetDatabase("testdb").GetCollection<Employee>("Employee").InsertOne(emp);

            return new JsonResult("Added sucessfully");
        }

        [HttpPut]

        public JsonResult Put(Employee emp)
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));

            var filter = Builders<Employee>.Filter.Eq("EmployeeId", emp.EmployeeId);
            var update = Builders<Employee>.Update.Set("Department", emp.Department)
                                                     .Set("DateOfJoining", emp.DateOfJoining)
                                                     .Set("PhotoFileName", emp.PhotoFileName);

            dbclient.GetDatabase("testdb").GetCollection<Employee>("Employee").UpdateOne(filter, update);

            return new JsonResult("updated sucessfully");
        }

        [HttpDelete("(id)")]

        public JsonResult Delete(Employee dep)
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));
            var filter = Builders<Employee>.Filter.Eq("EmployeeId", dep.EmployeeId);

            dbclient.GetDatabase("testdb").GetCollection<Employee>("Employee").DeleteOne(filter);

            return new JsonResult("Deleted sucessfully");
        }
    }
}
