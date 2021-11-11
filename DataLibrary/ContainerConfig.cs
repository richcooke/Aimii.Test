using Autofac;

namespace DataLibrary
{
    public static class ContainerConfig
    {
        public static IContainer Configure()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<ExcelService>().As<IExcelService>();
            builder.RegisterType<User>().As<IUser>();
            builder.RegisterType<AppSettings>().As<IAppSettings>();

            return builder.Build();
        }
    }
}
