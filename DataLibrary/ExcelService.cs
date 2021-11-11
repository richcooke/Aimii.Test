using System;
using System.IO;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Data.OleDb;
using Autofac;
using Newtonsoft.Json;
using OfficeOpenXml;


namespace DataLibrary
{
    public class ExcelService : IExcelService
    {
        public string FilePath;
        public string WorkSheetName;
        public List<User> Users = new List<User>();

        //Inject dependencies
        IAppSettings _appSettings;
        IUser _user;
        
        public ExcelService(IAppSettings appSettings, IUser user)
        {
            _appSettings = appSettings;
            _user = user;
            this.FilePath = _appSettings.Path;
            this.WorkSheetName = _appSettings.WorkSheetName;
        }

        public List<User> GetUsers()
        {
            ////var data = from a in ExcelFile.Worksheet<User>(this.WorkSheetName) select a;
            ////this.Users = new List<User>(data) { user };
            var data = ReadFromExcel<List<User>>(this.FilePath);
            this.Users = new List<User>(data);
            return this.Users;
        }

        public List<User> SetUsers(List<User> users)
        {
            this.Users = users;
            return this.Users;
        }

        public List<User> AddUser(User user)
        {
            this.Users = ReadFromExcel<List<User>>(this.FilePath);
            this.Users.Add(user);
            return this.Users;
        }

        public List<User> SaveToExcelFile()
        {
            this.WriteToExcel();
            return this.Users;
        }

        public List<User> ResetExcelFile()
        {
            this.FilePath = _appSettings.PathReset;
            this.SetUsers(this.GetUsers());
            this.FilePath = _appSettings.Path;
            this.Users = this.SaveToExcelFile();
            return this.Users;
        }

        private static T ReadFromExcel<T>(string path, bool hasHeader = true)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var excelPack = new ExcelPackage();
            //Load excel stream
            using (var stream = File.OpenRead(path))
            {
                excelPack.Load(stream);
            }
            
            //Get first worksheet
            var ws = excelPack.Workbook.Worksheets[0];

            var excelAsTable = new DataTable();
            foreach (var firstRowCell in ws.Cells[1, 1, 1, ws.Dimension.End.Column])
            {
                if (!string.IsNullOrEmpty(firstRowCell.Text))
                {
                    string firstColumn = string.Format("Column {0}", firstRowCell.Start.Column);
                    excelAsTable.Columns.Add(hasHeader ? firstRowCell.Text : firstColumn);
                }
            }
            var startRow = hasHeader ? 2 : 1;
            for (var rowNum = startRow; rowNum <= ws.Dimension.End.Row; rowNum++)
            {
                var wsRow = ws.Cells[rowNum, 1, rowNum, excelAsTable.Columns.Count];
                var row = excelAsTable.Rows.Add();
                foreach (var cell in wsRow)
                {
                    row[cell.Start.Column - 1] = cell.Text;
                }
            }

            var generatedType = JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(excelAsTable));
            return (T)Convert.ChangeType(generatedType, typeof(T));
        }

        private void WriteToExcel()
        {
            var table = (DataTable)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(this.Users), (typeof(DataTable)));
            var filePath = new FileInfo(this.FilePath);
            using var excelPack = new ExcelPackage(filePath);
            //Remove old worksheet then add the new one in
            excelPack.Workbook.Worksheets.Delete(this.WorkSheetName);
            var ws = excelPack.Workbook.Worksheets.Add(this.WorkSheetName);
            ws.Cells.LoadFromDataTable(table, true, OfficeOpenXml.Table.TableStyles.Light8);
            excelPack.Save();
        }
    }
}
