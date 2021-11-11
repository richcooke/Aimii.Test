using System;
using System.Collections.Generic;
using System.Text;

namespace DataLibrary
{
    public class AppSettings : IAppSettings
    {
        public string Path { get; set; }
        public string PathReset { get; set; }
        public string WorkSheetName { get; set; }

        public AppSettings()
        {
        this.Path = @"C:\Dev\Aimii\DataLibrary\Data\InterviewTestData.xlsx";
        this.PathReset = @"C:\Dev\Aimii\DataLibrary\Data\InterviewTestDataReset.xlsx";
        this.WorkSheetName = "InterviewTestData";
        }
    }
}
