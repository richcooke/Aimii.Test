using System.Collections;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using DataLibrary;

namespace Aimii.Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IExcelService _excelService;
        
        public HomeController(IExcelService excelService)
        {
            _excelService = excelService;
        }

        // GET
        [HttpGet]
        public List<User> Get()
        {
            List<User> users = _excelService.GetUsers();
            return users;
        }
    }
}