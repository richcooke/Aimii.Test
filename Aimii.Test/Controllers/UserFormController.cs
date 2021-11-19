using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataLibrary;

namespace Aimii.Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserFormController : ControllerBase
    {
        private readonly IAppSettings _appSettings;
        private readonly IUser _user;
        private readonly IExcelService _excelService;

        public UserFormController(IAppSettings appSettings, IUser user, IExcelService excelService)
        {
            _appSettings = appSettings;
            _user = user;
            _excelService = excelService;
        }

        // POST: UserFormController/Create
        [HttpPost]
        public List<User> Create(User user)
        {
            _excelService.AddUser(user);
            _excelService.SaveToExcelFile();
            List<User> users = _excelService.GetUsers();
            return users;
        }
    }
}
