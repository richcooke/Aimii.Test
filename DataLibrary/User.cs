using System;
using System.Collections.Generic;
using System.Text;

namespace DataLibrary
{
    public class User : IUser
    {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string JobTitle { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }

            public User()
            {

            }

            public User(string firstName, string lastName, string jobTitle, string email, string phone)
            {
                this.FirstName = firstName;
                this.LastName = lastName;
                this.JobTitle = jobTitle;
                this.Email = email;
                this.Phone = phone;
            }
    }
}
