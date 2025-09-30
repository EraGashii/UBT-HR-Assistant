using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BackendApi.Controllers
{
    public class ChatMessage
    {
        public string Role { get; set; }
        public string Content { get; set; }
    }

    public class ChatRequest
    {
        public List<ChatMessage> Messages { get; set; }
    }

    [ApiController]
    [Route("api/hr/[controller]")]
    public class ChatController : ControllerBase
    {
        [HttpPost]
        public IActionResult Chat([FromBody] ChatRequest request)
        {
            // Merr mesazhin e fundit nga user-i
            var lastMessage = request.Messages?.LastOrDefault()?.Content ?? "(s'ka mesazh)";

            // Kthe një përgjigje demo (dummy)
            return Ok(new
            {
                choices = new[]
                {
                    new { message = new { content = $"(Demo) Mora mesazhin: {lastMessage}" } }
                }
            });
        }
    }
}
