var builder = WebApplication.CreateBuilder(args);

// Shto Controllers
builder.Services.AddControllers();

// Enable CORS për frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Shto routing për Controllers
app.MapControllers();

app.Run();
