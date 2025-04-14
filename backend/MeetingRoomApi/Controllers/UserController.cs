using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Shared.Models;
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
        public async Task<IActionResult> CreateUser([FromBody] UserDTO dto)
        {
            if (await _authService.GetUserByUsernameAsync(dto.Username) != null)
            {
                return BadRequest(new { message = $"The user {dto.Username} already exists!" });
            }
            var user = await _authService.CreateUserAsync(dto.Username, dto.Password, dto.Role, dto.FullName, dto.Email);
            
            return Ok(user);
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDTO dto)
        {
            var userEntity = await _userService.GetUserByIdAsync(dto.Id);
            if (userEntity == null)
            {
                return BadRequest(new { message = $"The user {dto.Username} doesn't exist!" });
            }

            dto.Password = userEntity.PasswordHash;
            
            var user = new Domain.Entities.User
            {
                Id = dto.Id,
                Username = dto.Username,
                PasswordHash = dto.Password,
                Role = dto.Role,
                FullName = dto.FullName,
                Email = dto.Email
            };
            await _userService.UpdateUserAsync(user);

            return Ok(new { message = "User updating succeeded!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok();
        }


        [HttpGet("paged")]
        public async Task<IActionResult> GetUsers([FromQuery] PaginationRequest request)
        {
            var users = await _userService.GetUsers(request);

            return Ok(users);
        }

    }
}
