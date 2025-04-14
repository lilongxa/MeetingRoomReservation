using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.WebAPI.Helpers;

namespace MRR.WebAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly JwtHelper _jwtHelper;

        public AuthController(JwtHelper jwtHelper, IAuthService authService, IPasswordHasher passwordHasher)
        {
            _jwtHelper = jwtHelper;
            _authService = authService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if(loginDTO == null)
            {
                return BadRequest("Invalid client request");
            }
            if (string.IsNullOrEmpty(loginDTO.Email) || string.IsNullOrEmpty(loginDTO.Password))
            {
                return BadRequest("Invalid client request");
            }
            
            var user = await _authService.GetUserByEmailAsync(loginDTO.Email);
            if (user == null || !_passwordHasher.Verify(loginDTO.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials");
            }

            var tokenString = _jwtHelper.GenerateToken(user);

            return Ok(new { Token = tokenString });
        }
    }

}
