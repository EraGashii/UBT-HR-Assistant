using Microsoft.AspNetCore.Mvc;
using OpenAI.GPT3;
using OpenAI.GPT3.Interfaces;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3.ObjectModels;
using OpenAI.GPT3.ObjectModels.RequestModels;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IOpenAIService _openAiService;

    public ChatController()
    {
        // Merr API key nga environment variables (nga .env përmes DotNetEnv)
        var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

        if (string.IsNullOrEmpty(apiKey))
        {
            Console.WriteLine("⚠️  OPENAI_API_KEY nuk u gjet. Kontrollo .env ose Env.Load() në Program.cs");
        }
        else
        {
            Console.WriteLine("✅ OPENAI_API_KEY u ngarkua me sukses!");
        }

        _openAiService = new OpenAIService(new OpenAiOptions
        {
            ApiKey = apiKey
        });
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest(new { error = "Mesazhi nuk mund të jetë bosh." });

        var completion = await _openAiService.ChatCompletion.CreateCompletion(
            new ChatCompletionCreateRequest
            {
                Model = Models.ChatGpt3_5Turbo,
                Messages = new List<ChatMessage>
                {
                    ChatMessage.FromSystem("Ti je një HR Assistant. Përgjigju shkurt dhe qartë, maksimum 3 fjali."),
                    ChatMessage.FromUser(request.Message)
                },
                MaxTokens = 120,
                Temperature = 0.7f
            });

        if (completion.Successful)
        {
            return Ok(new { reply = completion.Choices[0].Message.Content });
        }
        else
        {
            Console.WriteLine($"❌ Gabim nga OpenAI API: {completion.Error?.Message}");
            return StatusCode(500, new { error = completion.Error?.Message ?? "Gabim nga serveri." });
        }
    }
}

public class ChatRequest
{
    public string Message { get; set; } = string.Empty;
}
