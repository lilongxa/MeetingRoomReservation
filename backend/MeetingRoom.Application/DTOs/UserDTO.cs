using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Application.DTOs
{
    public class UserDTO
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; } = "123456";
        [JsonProperty("role")]
        public string Role { get; set; }
        [JsonProperty("fullName")]
        public string FullName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }

    }
}
