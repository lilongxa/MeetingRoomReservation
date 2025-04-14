using Newtonsoft.Json;

namespace MRR.Application.DTOs
{
    public class LoginDTO
    {
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
