using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load env
Env.Load();

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

// Get API Key
var OPENAI_API_KEY = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
if (string.IsNullOrEmpty(OPENAI_API_KEY))
{
    Console.WriteLine("❌ OPENAI_API_KEY not found in .env");
}

// Endpoint
app.MapPost("/api/hr/chat", async (HttpContext ctx) =>
{
    var req = await JsonSerializer.DeserializeAsync<ChatRequest>(ctx.Request.Body);

    var system = new { role = "system", content = "You are a helpful HR Assistant." };
    var messages = new List<object> { system };
    if (req?.Messages != null) messages.AddRange(req.Messages);

    var payload = new
    {
        model = "gpt-4o-mini",
        temperature = 0.3,
        messages
    };

    using var http = new HttpClient();
    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", OPENAI_API_KEY);

    var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
    var response = await http.PostAsync("https://api.openai.com/v1/chat/completions", content);
    var json = await response.Content.ReadAsStringAsync();

    return Results.Content(json, "application/json");
});

app.Run();

record ChatRequest(List<object>? Messages);
