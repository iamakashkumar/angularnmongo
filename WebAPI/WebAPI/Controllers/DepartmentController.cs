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
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));

            var dblist = dbclient.GetDatabase("testdb").GetCollection<Department>("Department").AsQueryable();

            return new JsonResult(dblist);
        }


        [HttpPost]

        public JsonResult Post(Department dep)
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));

            int LastDepartmentId = dbclient.GetDatabase("testdb").GetCollection<Department>("Department").AsQueryable().Count();
            dep.DepartmentId = LastDepartmentId + 1;
            dbclient.GetDatabase("testdb").GetCollection<Department>("Department").InsertOne(dep);

            return new JsonResult("Added sucessfully");
        }

        [HttpPut]

        public JsonResult Put(Department dep)
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));

            var filter = Builders<Department>.Filter.Eq("DepartmentId",dep.DepartmentId);
            var update = Builders<Department>.Update.Set("DepartmentName", dep.DepartmentName);

            dbclient.GetDatabase("testdb").GetCollection<Department>("Department").UpdateOne(filter,update);

            return new JsonResult("updated sucessfully");
        }

        [HttpDelete("(id)")]

        public JsonResult Delete(Department dep)
        {
            MongoClient dbclient = new MongoClient(_configuration.GetConnectionString("EmployeeAppCon"));
            var filter = Builders<Department>.Filter.Eq("DepartmentId", dep.DepartmentId);

            dbclient.GetDatabase("testdb").GetCollection<Department>("Department").DeleteOne(filter);

            return new JsonResult("Deleted sucessfully");
        }
    }
}
