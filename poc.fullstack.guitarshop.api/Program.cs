using Microsoft.EntityFrameworkCore;
using poc.fullstack.guitarshop.api.Data;
using poc.fullstack.guitarshop.api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite
builder.Services.AddDbContext<GuitarShopContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// CORS
builder.Services.AddCors();

var app = builder.Build();



app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // EF SEED
    var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<GuitarShopContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        context.Database.Migrate();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "A problem occured during Migration");
    }
}

// CORS
app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()
       .WithOrigins("http://localhost:3000");
});

app.UseAuthorization();
app.MapControllers();

app.Run();