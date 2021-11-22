using System.Collections.Generic;
using System.Linq;
using DataLibrary;
using Moq;
using NUnit.Framework;

namespace UnitTests
{
    public class ExcelUnitTests
    {
        private IExcelService _excel;
        private User _user;
        private List<User> _users;
        private List<User> _usersReset;

        [SetUp]
        public void Setup()
        {
            _excel = new ExcelService(new AppSettings());
            _user = new User("Rich", "Cooke", "Web Developer", "richcooke@hotmail.com", "07909967687");
            _users = _excel.GetUsers();
        }

        [Test]
        public void CanGetUsersFromExcelFile()
        {
            //Arrange

            //Act
            this._users = _excel.GetUsers();

            //Assert
            Assert.IsNotNull(this._users);
            Assert.GreaterOrEqual(this._users.ToList().Count, 12);
        }

        [Test]
        public void AddUserToExcelFile()
        {
            //Arrange
            
            //Act
            this._users = this._excel.GetUsers();
            this._users = this._excel.AddUser(_user);
            this._users = this._excel.SaveToExcelFile();
            //Assert
            Assert.IsNotNull(this._users);
            Assert.GreaterOrEqual(this._users.ToList().Count, 13);
        }

        [Test]
        public void ResetExcelFile()
        {
            //Arrange
            
            //Act
            this._users = this._excel.ResetExcelFile();
            //Assert
            Assert.IsNotNull(this._users);
            Assert.GreaterOrEqual(this._users.ToList().Count, 12);
        }

        [Test]
        public void TestExcelMock()
        {
            //Arrange
            var _mockExcelService = new Mock<IExcelService>();
            var _mockExcelServiceReset = new Mock<IExcelService>();
            //Act
            this._usersReset = this._excel.GetUsers();
            this._users.Add(this._user);
            _mockExcelService.Setup(f => f.GetUsers()).Returns(this._usersReset);
            _mockExcelService.Setup(f => f.AddUser(this._user)).Returns(this._users);
            _mockExcelService.Setup(f => f.GetUsers()).Returns(this._users);
            _mockExcelServiceReset.Setup(f => f.SetUsers(this._usersReset)).Returns(this._usersReset);
            _mockExcelServiceReset.Setup(f => f.GetUsers()).Returns(this._usersReset);
            _mockExcelServiceReset.Setup(f => f.SaveToExcelFile()).Returns(this._usersReset);
            
            //Assert
            Assert.GreaterOrEqual(_mockExcelService.Object.GetUsers().Count, 13);
            Assert.GreaterOrEqual(_mockExcelServiceReset.Object.GetUsers().Count, 12);
        }
    }
}