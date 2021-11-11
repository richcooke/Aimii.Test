using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataLibrary
{
    public interface IExcelService
    {
        List<User> GetUsers();
        List<User> AddUser(User user);
        List<User> SetUsers(List<User> users);
        List<User> ResetExcelFile();
        List<User> SaveToExcelFile();
    }
}
