using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/hr/[controller]")]
    public class ChatController : ControllerBase
    {
        [HttpPost]
        public IActionResult Chat([FromBody] ChatRequest req)
        {
            if (req.Messages == null || !req.Messages.Any())
                return BadRequest(new { error = "Messages required" });

            var lastMsg = req.Messages.Last().Content;

            // Dummy response për testim
            var response = new
            {
                role = "assistant",
                content = $"(Demo) Mora mesazhin: {lastMsg}"
            };

            return Ok(response);
        }
    }

    public class ChatMessage
    {
        public string Role { get; set; } = "user";
        public string Content { get; set; } = "";
    }

    public class ChatRequest
    {
        public List<ChatMessage>? Messages { get; set; }
    }
}
