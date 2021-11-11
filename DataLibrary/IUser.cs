using System;
using System.Collections.Generic;
using System.Text;

namespace DataLibrary
{
    public interface IUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
