using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using SqlSugar;

namespace MRR.WebAPI.Controllers
{
    [Route("api/users")]
    //[Authorize(Roles = "Admin")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public UserController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return user != null ? Ok(user) : NotFound();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            await _userService.RegisterUserAsync(user);
            return Ok();
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO dto)
        {
            var success = await _authService.CreateUserAsync(dto.Username, dto.Password, dto.Role, dto.FullName, dto.Email);
            if (!success)
            {
                return BadRequest(new { message = $"The user {dto.Username} already exists!" });
            }
            return Ok(new { message = "User creation succeeded!" });
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetUsers([FromQuery] PaginationRequestDto request)
        {
            var users = await _userService.GetUsers(request);

            return Ok(users);
        }

    }
}
