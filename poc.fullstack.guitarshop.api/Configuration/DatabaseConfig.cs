using Microsoft.EntityFrameworkCore;
using poc.fullstack.guitarshop.api.Data;

namespace poc.fullstack.guitarshop.api.Configuration;

public static class DatabaseConfig
{
    public static void AddDatabasesConfiguration(this IServiceCollection services, IConfiguration config)
    {
        string connection = config.GetConnectionString("DefaultConnection");
        var serverVersion = new MySqlServerVersion(new Version(8, 0, 33));

        services.AddDbContext<GuitarShopContext>(options =>
            options.UseMySql(connection, serverVersion));
    }
}