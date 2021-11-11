namespace DataLibrary
{
    public interface IAppSettings
    {
        public string Path { get; set; }
        public string PathReset { get; set; }
        public string WorkSheetName { get; set; }
    }
}